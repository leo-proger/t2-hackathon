from fastapi import APIRouter, Request
from sqlalchemy import select

from backend.api.dependencies import SessionDep
from backend.models.event import EventModel
from backend.models.user import StatusEnum
from backend.schemas.event import EventSchema
from backend.secret_model import user_request_validity

router = APIRouter(prefix='/events', tags=['events'])


@router.get('/get_all')
async def get_all(request: Request, session: SessionDep):
    """
    Возвращает статус "ok" и массив всех событий
    :param request:
    :param session:
    :return:
    """

    await user_request_validity(request)

    query = select(EventModel)
    result = await session.execute(query)
    return {"ok": True, "result": result.scalars().all()}


@router.post('/add')
async def add(data: EventSchema, request: Request, session: SessionDep):
    """
    Добавление нового события
    :param request:
    :param data:
    :param session:
    :return:
    """

    await user_request_validity(request, StatusEnum.admin)

    new_event = EventModel(
        title=data.title,
        datatime_start=data.datatime_start,
        duration=data.duration,
        description=data.description,
        limit_participants=data.limit_participants
    )

    session.add(new_event)
    await session.commit()
    return {"ok": True}

