import datetime

from fastapi import APIRouter, Request
from sqlalchemy import select

from backend.api.dependencies import SessionDep
from backend.models.ticket import TicketModel
from backend.models.user import StatusEnum, UserModel
from backend.mappers.ticket_mapper import TicketMapper
from backend.schemas.ticket import AnswerTicketSchema
from backend.secret_model import user_request_validity

router = APIRouter(prefix='/ticket', tags=['ticket'])

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


@router.get('/get_actual')
async def get_actual(request: Request, session: SessionDep):
    await user_request_validity(request, StatusEnum.teacher, session)

    result = await session.execute(select(TicketModel))

    tickets = []
    for ticket in result.scalars().all():
        tickets.append(TicketMapper.to_schem(ticket))

    return tickets

@router.post('/answer')
async def answer(data: AnswerTicketSchema,request: Request, session: SessionDep):
    await user_request_validity(request, StatusEnum.teacher, session)

    query = select(TicketModel).filter(TicketModel.id == data.id)
    result = await session.execute(query)
    ticket = result.scalars().all()
    if not ticket:
        return False

    query = select(UserModel).filter(UserModel.id == ticket[0].who_asked)
    result = await session.execute(query)
    user: UserModel = result.scalars().one()

    if user.count_messages == 0:
        history = ""
    else:
        history = user.chat_history + ", "
    user.chat_history = history + str(mess_to_format(data.answer, 'bot', user.count_messages)).replace("'", "\"")
    user.count_messages = user.count_messages + 1

    await session.commit()
    return True

@router.post('/new_ticket')
async def new_ticket(data, request: Request, session: SessionDep):
    user = await user_request_validity(request, StatusEnum.all, session)

    session.add(TicketModel(
        date=datetime.datetime.now(),
        question=data,
        who_asked=user.id
    ))
    await session.commit()
    return True
