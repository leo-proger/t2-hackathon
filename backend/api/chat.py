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
            "text": message,
            "timestamp": str(datetime.datetime.now())
        }
    }


@router.get('/history')
async def get_history(request: Request, session: SessionDep):
    user = await user_request_validity(request, StatusEnum.all, session)

    try:
        print(user.chat_history)
        return json.loads(f"[{user.chat_history}]")
    except Exception as e:
        print(e)
        return f"[{user.chat_history}]"


@router.post('/message')
async def send_message(message: MessageSchema, request: Request, session: SessionDep):
    user = await user_request_validity(request, StatusEnum.all, session)

    data = await main_agent.ask_question(message.text)

    if user.count_messages == 0:
        history = ""
    else:
        history = user.chat_history + ", "

    history += json.dumps(mess_to_format(message.text, 'user', user.count_messages))
    bot_say = mess_to_format(data, 'bot', user.count_messages+1)
    history += ", " + json.dumps(bot_say)

    user.chat_history = history.replace("'", "\"").replace("None", "null")
    user.count_messages += 2

    await session.commit()
    return bot_say
