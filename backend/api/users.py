from authx import exceptions
from fastapi import APIRouter, HTTPException, Response, Request
from sqlalchemy import select, update
from sqlalchemy.orm import joinedload, selectinload

from backend.api.dependencies import SessionDep
from backend.mappers.user_mapper import UserMeMapper
from backend.models.user import UserModel, StatusEnum
from backend.schemas.user import UserCreateSchema, UserLoginSchema, UserResetPassword, UserNewDataSchema
from backend.secret_model import hashing, generate_password, test_passw, security, config, user_request_validity

router = APIRouter(prefix='/users', tags=['users'])


@router.post('/login')
async def login(credentials: UserLoginSchema, request: Request, session: SessionDep, response: Response):
    await user_request_validity(request)

    query = select(UserModel).filter(UserModel.email == str(credentials.email).lower())
    result = await session.execute(query)
    res = result.scalars().all()
    if len(res) == 1:
        if test_passw(credentials.password, res[0].passwordHash):
            access_token = security.create_access_token(str(res[0].id))
            refresh_token = security.create_refresh_token(str(res[0].id))
            response.set_cookie(config.JWT_ACCESS_COOKIE_NAME, access_token)
            response.set_cookie(config.JWT_REFRESH_COOKIE_NAME, refresh_token)
            return {"ok": True, "access_token": access_token, "refresh_token": refresh_token}

    raise HTTPException(status_code=401, detail="Invalid email or password")


@router.post('/create')
async def create(data: UserCreateSchema, request: Request, session: SessionDep):
    """
    Добавление нового пользователя (будет ограниченна)
    :param request:
    :param data:
    :param session:
    :return:
    """

    await user_request_validity(request, [StatusEnum.moderator, StatusEnum.admin])

    query = select(UserModel).filter(UserModel.email == str(data.email).lower())
    result = await session.execute(query)
    res = result.scalars().all()
    if len(res) == 0:
        pass_w, hesh_passsw = generate_password(1)
        new_user = UserModel(
            groupID=data.groupID,
            subgroup=data.subgroup,

            status=StatusEnum.student,

            fullName=data.fullName,
            passwordHash=hesh_passsw,
            email=str(data.email),

        )
        session.add(new_user)
        await session.commit()
        return {"ok": True, "passW": pass_w}
    else:
        return {"ok": False, "mes": "This user has already been added"}


@router.get('/refresh')
async def refresh(request: Request, response: Response):
    try:
        refresh_payload = await security.refresh_token_required(request)
    except exceptions.MissingTokenError as e:
        raise HTTPException(status_code=401, detail=f"Undefined token in cookie")
    except exceptions.JWTDecodeError as e:
        raise HTTPException(status_code=422, detail=f"Invalid token or the access token has expired.")

    access_token = security.create_access_token(refresh_payload.sub)
    refresh_token = security.create_refresh_token(refresh_payload.sub)
    response.set_cookie(config.JWT_ACCESS_COOKIE_NAME, access_token)
    response.set_cookie(config.JWT_REFRESH_COOKIE_NAME, refresh_token)

    return {"ok": True, "access_token": access_token, "refresh_token": refresh_token}


@router.get('/get_all')
async def get_all(request: Request, session: SessionDep):
    """
    Возвращает статус "ok" и массив всех пользователей
    :param request:
    :param token:
    :param session:
    :return:
    """
    await user_request_validity(request, StatusEnum.admin)
    # print(user)

    query = (
        select(UserModel)
        .options(joinedload(UserModel.group))
        .options(selectinload(UserModel.chats))
    )
    result = await session.execute(query)
    result = result.unique().scalars().all()
    return {"ok": True, "result": result}


@router.post('/reset_password')
async def reset_password(credentials: UserResetPassword, request: Request, session: SessionDep):
    user = await user_request_validity(request, StatusEnum.all, session)
    if not test_passw(credentials.old_password, user.passwordHash):
        return {"ok": False, "mes": "Invalid password"}
    else:
        query = (
            update(UserModel)
            .values(passwordHash=hashing(credentials.new_password))
            .filter_by(id=user.id)
        )
        await session.execute(query)
        await session.commit()
        return {"ok": True}


@router.post('/new_data')
async def new_data(data: UserNewDataSchema, request: Request, session: SessionDep):
    user = await user_request_validity(request, StatusEnum.all, session)


    if data.surname:
        user.surname = data.surname
    if data.name:
        user.name = data.name
    if data.middle_name:
        user.middle_name = data.middle_name

    full_name = []
    if user.surname:
        full_name.append(user.surname)
    if user.name:
        full_name.append(user.name)
    if user.middle_name:
        full_name.append(user.middle_name)

    user.fullName = " ".join(full_name)

    if data.date_of_birth:
        user.date_of_birth=data.date_of_birth


    await session.commit()
    return {"ok": True}


@router.get('/me')
async def me(request: Request, session: SessionDep):
    """
    Возвращает статус "ok" и профиль текущего пользователя.
    :param request:
    :param session:
    :return:
    """
    user = await user_request_validity(request, StatusEnum.all, session)

    query = (
        select(UserModel)
        .filter(UserModel.name == user.name)
    )

    result = await session.execute(query)
    result = result.unique().scalars().all()[0]

    print(type(result))
    print(result)

    return UserMeMapper.to_schem(result)
