import datetime
from datetime import date, timedelta

from fastapi import APIRouter, Request, Query
from sqlalchemy import select, or_, and_

from backend.api.dependencies import SessionDep
from backend.mappers.lesson_mapper import LessonMapper
from backend.models.lesson import LessonModel
from backend.models.user import StatusEnum
from backend.schemas.lesson import LessonSchema, LessonFilterSchema
from backend.secret_model import user_request_validity

nomber_lesson = [
    (None, datetime.time(8, 20)),
    (datetime.time(8, 30), datetime.time(10, 0)),
    (datetime.time(10, 10), datetime.time(11, 40)),
    (datetime.time(11, 50), datetime.time(13, 20)),
    (datetime.time(14, 0), datetime.time(15, 30)),
    (datetime.time(15, 40), datetime.time(17, 10)),
]


def get_now_lesson():
    time = datetime.datetime.now().time()
    for nomber in range(1, 6):
        if nomber_lesson[nomber - 1][1] < time <= nomber_lesson[nomber][1]:
            return nomber


router = APIRouter(prefix='/schedule', tags=['lessons'])
router2 = APIRouter(prefix='/lessons', tags=['lessons'])


@router.get('/today')
async def personal_today(request: Request, session: SessionDep):
    """
    Возвращает статус "ok" и все пары соответствующие настройкам фильтра.

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
async def get_filter(request: Request, session: SessionDep, date: date = Query(
        default=datetime.date.today(),
        description="Дата расписания",
        example="2026-05-15",
        ge=date.today(),  # дата не раньше сегодня
        le=date.today() + timedelta(days=30)  # не позже чем через 30 дней
    )):
    """
    Возвращает статус "ok" и все пары соответствующие настройкам фильтра.

    :param data:
    {
      "date": "2025-09-20",
      "subgroup": 1,
      "with_shared": true,
      "groupID": 8562,
    }

    date - Дата

    subgroup - Номер подгруппы: 0-общие, 1-первая, 2-вторая

    with_shared - Отображать ли общие пары при выборе подгруппы (не поддерживает null)

    groupID - id группы

    При вводе в параметр null фильтрация по нему не применяется.

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


@router2.get('/personal/now')
async def personal_get_now_lesson(request: Request, session: SessionDep):
    """
    Возвращает статус "ok" и пару, которая идёт в этот момент или начнётся после перемены.

    :param request:
    :param session:
    :return:
    """

    user = await user_request_validity(request, StatusEnum.all, session)

    nomber = get_now_lesson()

    query = (select(LessonModel)
             .filter_by(date = datetime.date.today())
             .filter_by(groupID = user.groupID)
             .filter(or_(LessonModel.subgroup == 0, LessonModel.subgroup == user.subgroup))
             .filter_by(lesson_number = nomber)
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



@router2.get('/get_all')
async def get_all(request: Request, session: SessionDep):
    """
    Возвращает статус "ok" и массив ВСЕХ пар для ВСЕХ групп
    :param request:
    :param session:
    :return:
    """

    await user_request_validity(request)

    query = select(LessonModel)
    result = await session.execute(query)
    return {"ok": True, "result": result.scalars().all()}


@router2.post('/get_week_filter')
async def get_week_filter(data: LessonFilterSchema, request: Request, session: SessionDep):
    """
    Возвращает статус "ok" и все пары с выбранной недели, соответствующие настройкам фильтра.

    :param data:
    {
      "date": "2025-09-20",
      "subgroup": 0,
      "with_shared": true,
      "groupID": 8562,
    }

    date - Любая дата с недели

    subgroup - Номер подгруппы: 0-общие, 1-первая, 2-вторая

    with_shared - Отображать ли общие пары при выборе подгруппы (не поддерживает null)

    groupID - id группы

    При вводе в параметр null фильтрация по нему не применяется.

    :param request:
    :param session:
    :return:
    """

    await user_request_validity(request)

    query = select(LessonModel)
    if data.date:
        first_day = data.date - datetime.timedelta(days=data.date.weekday())
        last_day = data.date + datetime.timedelta(days=6 - data.date.weekday())
        query = query.filter(
            and_(LessonModel.date >= first_day, LessonModel.date <= last_day)
        )

    if data.subgroup:
        # query = query.filter(LessonModel.subgroup == data.subgroup)
        if data.with_shared:
            query = query.filter(
                or_(LessonModel.subgroup == 0, LessonModel.subgroup == data.subgroup)
            )
        else:
            query = query.filter(LessonModel.subgroup == data.subgroup)
    if data.groupID:
        query = query.filter(LessonModel.groupID == data.groupID)

    result = await session.execute(query)
    return {"ok": True, "result": result.scalars().all()}



@router2.get('/personal/get_week')
async def personal_get_week(request: Request, session: SessionDep):
    """
    Возвращает статус "ok" и все пары с выбранной недели, соответствующие настройкам фильтра.

    :param request:
    :param session:
    :return:
    """

    user = await user_request_validity(request, StatusEnum.all, session)

    day = datetime.date.today()
    first_day = day - datetime.timedelta(days=day.weekday())
    last_day = day + datetime.timedelta(days=6 - day.weekday())
    query = (select(LessonModel)
             .filter(
                and_(LessonModel.date >= first_day, LessonModel.date <= last_day)
            )
             .filter(or_(LessonModel.subgroup == 0, LessonModel.subgroup == user.subgroup))
             .filter(LessonModel.groupID == user.groupID)
             )

    result = await session.execute(query)
    return {"ok": True, "result": result.scalars().all()}



@router2.get('/personal/next')
async def personal_get_next_lesson(request: Request, session: SessionDep):
    """
    Возвращает статус "ok" и следующую пару.

    :param request:
    :param session:
    :return:
    """

    user = await user_request_validity(request, StatusEnum.all, session)

    nomber = get_now_lesson()

    query = (select(LessonModel)
             .filter(LessonModel.date == datetime.date.today())
             .filter(LessonModel.groupID == user.groupID)
             .filter(or_(LessonModel.subgroup == 0, LessonModel.subgroup == user.subgroup))
             .filter(LessonModel.lesson_number == nomber + 1)
             )

    result = await session.execute(query)
    return {"ok": True, "result": result.scalars().all()}
