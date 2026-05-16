import datetime
import json

from fastapi import APIRouter, Request

from backend.agent.main_ai_agent import main_agent
from backend.api.dependencies import SessionDep
from backend.models.user import StatusEnum
from backend.schemas.message import MessageSchema
from backend.secret_model import user_request_validity

router = APIRouter(prefix='/chat', tags=['chat'])

def mess_to_format(message, role):
    d = {
        "message": {
            "role": role,
            "text": message,
            "timestamp": str(datetime.datetime.now())
        }
    }
    return d


@router.get('/history')
async def history(request: Request, session: SessionDep):
    """
    :param request:
    :param session:
    :return:
    """

    user = await user_request_validity(request, StatusEnum.all, session)

    print(f"[{user.chat_history}]")
    return json.loads(f"[{user.chat_history}]")


@router.post('/message')
async def history(message: MessageSchema, request: Request, session: SessionDep):
    """
    :param request:
    :param session:
    :return:
    """

    user = await user_request_validity(request, StatusEnum.all, session)

    data = await main_agent.ask_question(message.text)

    if user.chat_history != "":
        history = user.chat_history + ", "
    else:
        history = ""

    bot_say = mess_to_format(data, 'bot')
    history += f"{mess_to_format(message.text, 'user')}, {bot_say}"
    user.chat_history = history

    await session.commit()
    return bot_say
[{'message': {'role': 'user', 'text': MessageSchema(sessionId='Какая погода?', text='Какая погода'), 'timestamp': '2026-05-16 04:48:12.306939'}}, {'message': {'role': 'bot', 'text': 'Я ваще хз', 'timestamp': '2026-05-16 04:48:12.306926'}}, {'message': {'role': 'user', 'text': MessageSchema(sessionId='Как связаться с администрацией?', text='Какая погода'), 'timestamp': '2026-05-16 04:54:40.168608'}}, {'message': {'role': 'bot', 'text': '\n\nЯ помогаю только с вопросами об университете и студенческой жизни. Ваш запрос о погоде не входит в мою компетенцию — я не могу предоставлять информацию о погодных условиях, так как это не связано с учебной деятельностью, кампусом или студенческой инфраструктурой.', 'timestamp': '2026-05-16 04:54:40.168598'}}, {'message': {'role': 'user', 'text': MessageSchema(sessionId='Как связаться с администрацией?', text='Как связаться с администрацией?'), 'timestamp': '2026-05-16 04:56:07.645068'}}, {'message': {'role': 'bot', 'text': None, 'timestamp': '2026-05-16 04:56:07.645060'}}]