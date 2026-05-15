import json
import pathlib
from pathlib import Path

from fastapi import APIRouter, Request
from fastapi.responses import FileResponse

from backend.api.events import router as events_router
from backend.api.lessons import router as lessons_router
from backend.api.users import router as users_router
from backend.api.quests import router as quests_router

from backend.database import engine, Base, new_session
from backend.models.quest import QuestModel
from backend.models.user import UserModel, StatusEnum

main_router = APIRouter()


async def add_base():
    session = new_session()
    # session.add(GroupModel(
    #     groupID=0,
    #     name="zero",
    #     kurs=0,
    #     facul="zero",
    #     yearName="0-0",
    # ))
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

    with pathlib.Path('quests.json').open("r", encoding='utf-8') as f:
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
# main_router.include_router(chats_router)
# main_router.include_router(messages_router)


@main_router.get('/get_admin_key')
async def get_admin_key():
    """
    Получить админ-ключ для полного доступа к базе данных и api
    """

    image_path = Path("pashalko.jpg")
    if not image_path.is_file():
        return {"error": "Image not found on the server"}
    return FileResponse(image_path)
