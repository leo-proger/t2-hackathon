import datetime
import json

from fastapi import APIRouter, Request

from backend.agent.main_ai_agent import main_agent
from backend.api.dependencies import SessionDep
from backend.models.user import StatusEnum
from backend.schemas.message import MessageSchema
from backend.secret_model import user_request_validity

router = APIRouter(prefix='/chat', tags=['chat'])

def mess_to_format(message, role, id_message):
    d = {
        "message": {
            "id": id_message,
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

    # try:
    print(user.chat_history)
    return json.loads(f"[{user.chat_history}]")
    # except Exception as e:
    #     print(e)
    #     return f"[{user.chat_history}]"


@router.post('/message')
async def history(message: MessageSchema, request: Request, session: SessionDep):
    """
    :param request:
    :param session:
    :return:
    """

    user = await user_request_validity(request, StatusEnum.all, session)

    data = await main_agent.ask_question(message.text)

    if user.count_messages == 0:
        history = ""
    else:
        history = user.chat_history + ", "

    history += f"{mess_to_format(message.text, 'user', user.count_messages)}"
    if data != None:
        bot_say = mess_to_format(data, 'bot', user.count_messages+1)
    else:
        bot_say = mess_to_format("Я не смог найти информацию. Но я могу отправить твой вопрос в университет, что бы там на него ответили, а я тебе его передам.", 'bot', user.count_messages+1)
    history += f", {bot_say}"
    # user.count_messages += 1

    user.chat_history = history.replace("'", "\"").replace("None", "null")
    user.count_messages += 2

    await session.commit()
    return bot_say
