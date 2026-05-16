import datetime
from datetime import timedelta

from fastapi import APIRouter, Request, Query
from sqlalchemy import select, or_

from backend.api.dependencies import SessionDep
from backend.mappers.lesson_mapper import LessonMapper
from backend.models.lesson import LessonModel
from backend.models.user import StatusEnum
from backend.schemas.lesson import LessonSchema
from backend.secret_model import user_request_validity


router = APIRouter(prefix='/schedule', tags=['lessons'])

date_default = Query(
    default=datetime.date.today(),
    description="Дата расписания",
    example="2026-05-15",
    ge=datetime.date.today() - timedelta(days=30),  # не раньше чем через 30 дней
    le=datetime.date.today() + timedelta(days=30)  # не позже чем через 30 дней
)

@router.get('/today')
async def personal_today(request: Request, session: SessionDep):
    """
    Возвращает все пары соответствующие настройкам фильтра.

    :param request:
    :param session:
    :return:
    """

    user = await user_request_validity(request, StatusEnum.all, session)

    query = (select(LessonModel)
             .filter(LessonModel.date == datetime.date.today())
             .filter(LessonModel.groupID == user.groupID)
             .filter(or_(LessonModel.subgroup == 0, LessonModel.subgroup == user.subgroup))
             )


    result = await session.execute(query)
    lessons = []
    for lesson in result.scalars().all():
        lessons.append(LessonMapper.to_schem(lesson))

    return lessons


@router.post('')
async def get_on_date(request: Request, session: SessionDep, date: datetime.date = date_default):
    """
    :param date:
    :param request:
    :param session:
    :return:
    """

    user = await user_request_validity(request, StatusEnum.all, session)


    query = (select(LessonModel)
             .filter(LessonModel.date == date)
             .filter(LessonModel.groupID == user.groupID)
             .filter(or_(LessonModel.subgroup == 0, LessonModel.subgroup == user.subgroup))
             )

    result = await session.execute(query)
    lessons = []
    for lesson in result.scalars().all():
        lessons.append(LessonMapper.to_schem(lesson))

    return lessons


@router.post('/add')
async def add(data: LessonSchema, request: Request, session: SessionDep):
    """
    Добавление нового урока (будет ограниченна)
    :param data:
    :param session:
    :return:
    """

    await user_request_validity(request, StatusEnum.admin)

    new_lesson = LessonModel(
        cod=data.cod,
        date=data.date,
        week_day=data.week_day,
        code_semester=data.code_semester,
        week_type=data.week_type,
        subgroup=data.subgroup,
        hour=data.hour,
        name=data.name,
        teacher=data.teacher,
        auditorium=data.auditorium,
        groupID=data.groupID,
        group=data.group,
        lesson_number=data.lesson_number,
        color=data.color
    )
    session.add(new_lesson)
    await session.commit()
    return {"ok": True}

