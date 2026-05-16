import datetime
import json

from fastapi import APIRouter, Request

from backend.agent.main_ai_agent import main_agent
from backend.api.dependencies import SessionDep
from backend.models.user import StatusEnum
from backend.schemas.message import MessageSchema
from backend.secret_model import user_request_validity

router = APIRouter(prefix='/chat', tags=['chat'])


def mess_to_format(message, role, id_message) -> dict:
    return {
        "message": {
            "id": id_message,
            "role": role,
            "text": message or "",
            "timestamp": str(datetime.datetime.now())
        }
    }


@router.get('/history')
async def get_history(request: Request, session: SessionDep):
    user = await user_request_validity(request, StatusEnum.all, session)

    raw = (user.chat_history or "").strip()
    if not raw:
        return []

    try:
        return json.loads(f"[{raw}]")
    except json.JSONDecodeError:
        user.chat_history = ""
        user.count_messages = 0
        await session.commit()
        return []


@router.post('/message')
async def send_message(message: MessageSchema, request: Request, session: SessionDep):
    user = await user_request_validity(request, StatusEnum.all, session)

    # ask_question всегда возвращает строку (ошибки обработаны внутри)
    bot_text = await main_agent.ask_question(message.text)

    user_msg = mess_to_format(message.text, 'user', user.count_messages)
    bot_msg  = mess_to_format(bot_text,     'bot',  user.count_messages + 1)

    # json.dumps гарантирует валидный JSON (None→null, нет Python repr)
    user_json = json.dumps(user_msg, ensure_ascii=False)
    bot_json  = json.dumps(bot_msg,  ensure_ascii=False)

    separator = ", " if user.count_messages > 0 and user.chat_history else ""
    user.chat_history = (user.chat_history or "") + separator + user_json + ", " + bot_json
    user.count_messages += 2

    await session.commit()
    return bot_msg
