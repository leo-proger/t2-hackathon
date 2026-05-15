from pathlib import Path

from fastapi import APIRouter, Request
from fastapi.responses import FileResponse

# from backend.api.chats import router as chats_router
from backend.api.events import router as events_router
# from backend.api.groups import router as groups_router
from backend.api.lessons import router as lessons_router
# from backend.api.messages import router as messages_router
from backend.api.users import router as users_router
from backend.database import engine, Base, new_session
# from backend.models.group import GroupModel
from backend.models.user import UserModel, StatusEnum
# from backend.secret_model import user_request_validity

# import backend.binders.bind1

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

        name="Altron1423",
        surname="",
        faculty="ИВИТШ",
        year=0,
        simestr=0,
        xp=0,
        level=-1,
        adaptationProgress=75,

        subgroup=0,
        language=None,
        status=StatusEnum.zero,
        passwordHash="ecb252044b5ea0f679ee78ec1a12904739e2904d",
        email='altron1423@gmail.com',
        date_of_birth=None
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
