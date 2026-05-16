import json
import pathlib
from pathlib import Path

from fastapi import APIRouter, Request
from fastapi.responses import FileResponse

from backend.api.events import router as events_router
from backend.api.lessons import router as lessons_router
from backend.api.users import router as users_router
from backend.api.quests import router as quests_router
from backend.api.chat import router as chat_router
from backend.api.tickets import router as tickets_router

from backend.database import engine, Base, new_session
from backend.models.quest import QuestModel
from backend.models.user import UserModel, StatusEnum

main_router = APIRouter()


async def add_base():
    session = new_session()
    session.add(UserModel(
        group="",
        groupID=0,

        name="ThisIsName",
        surname="",
        faculty="ИВИТШ",
        level=-1,

        status=StatusEnum.zero,
        passwordHash="ecb252044b5ea0f679ee78ec1a12904739e2904d",
        email='user@example.com',
        date_of_birth=None
    ))
    session.add(UserModel(
        group="25-ИСбо-1",
        groupID=1,

        name="Вася",
        surname="Капотин",
        faculty="ИВИТШ",
        level=0,

        status=StatusEnum.student,
        passwordHash="40bd001563085fc35165329ea1ff5c5ecbdbbeef",
        email='t1@u.ru',
        date_of_birth=None
    ))
    session.add(UserModel(
        group="25-ИСбо-2",
        groupID=2,

        name="Ася",
        surname="Рыжёва",
        faculty="ИВИТШ",
        level=0,

        status=StatusEnum.student,
        passwordHash="40bd001563085fc35165329ea1ff5c5ecbdbbeef",
        email='t2@u.ru',
        date_of_birth=None
    ))
    session.add(UserModel(
        group="",
        groupID=0,

        name="Иван",
        surname="Петрович",
        faculty="ИВИТШ",
        level=0,

        status=StatusEnum.teacher,
        passwordHash="40bd001563085fc35165329ea1ff5c5ecbdbbeef",
        email='t3@u.ru',
        date_of_birth=None
    ))

    with pathlib.Path('data_files/quests.json').open("r", encoding='utf-8') as f:
        data = json.load(f)

    for quest in data:
        session.add(QuestModel(
            **quest
        ))

    await session.commit()


@main_router.post('/setup_database')
async def setup_database(request: Request):
    """
    Перезапись базы данных (будет ограниченна)
    :return:
    """

    # await user_request_validity(request, [])

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

        await add_base()

    return {'success': True}


# main_router.include_router(groups_router)
main_router.include_router(lessons_router)
main_router.include_router(users_router)
main_router.include_router(events_router)
main_router.include_router(quests_router)
main_router.include_router(chat_router)
main_router.include_router(tickets_router)


@main_router.get('/get_admin_key')
async def get_admin_key():
    """
    Получить админ-ключ для полного доступа к базе данных и api
    """

    image_path = Path("pashalko.jpg")
    if not image_path.is_file():
        return {"error": "Image not found on the server"}
    return FileResponse(image_path)
