import hashlib
import os
import time

from authx import AuthX, AuthXConfig, exceptions
from fastapi import HTTPException, Request
# from sqlalchemy import select

from backend.database import new_session
from backend.models.user import UserModel, StatusEnum

# import datetime

config = AuthXConfig()

config.JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', "SECRET_KEY")
config.JWT_ACCESS_COOKIE_NAME = "access_token_KGU"
config.JWT_REFRESH_COOKIE_NAME = "refresh_token_KGU"
config.JWT_COOKIE_CSRF_PROTECT = False
config.JWT_TOKEN_LOCATION = ["headers", "query", "cookies", "json"]
# config.JWT_TOKEN_LOCATION = ["cookies"]
config.JWT_ALGORITHM = "HS256"
# config.JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(seconds=20)

security = AuthX(config=config)

hash_model = hashlib.sha1

dict_users_rec = {}
max_user_rec = 1000
min_time_user_rec = 3


def hashing(text):
    return hash_model(text.encode()).hexdigest()


def test_passw(text, rezult):
    return hashing(text) == rezult


def generate_password(id: int):
    password = "string"
    return password, hashing(password)


async def user_request_validity(request, statuses: StatusEnum | list[StatusEnum] = None, session=None):
    valid_time_count_request(request)

    if statuses is not None:
        data = await valid_token(request)

        user = await valid_user_statuses(data.sub, statuses, session)
        return user

    return None


def valid_time_count_request(request):
    client = request.client
    # print(client)

    if client not in dict_users_rec:
        dict_users_rec[client] = [1, time.time()]
    else:
        # print(time.time() - dict_users_rec[client][1])
        if time.time() - dict_users_rec[client][1] < min_time_user_rec:
            dict_users_rec[client][1] = time.time()
            raise HTTPException(status_code=429, detail=f"You can't send requests that often.")

        dict_users_rec[client][1] = time.time()
        dict_users_rec[client][0] += 1

        # print(dict_users_rec[client] > max_user_rec, dict_users_rec[client], max_user_rec)
        if dict_users_rec[client][0] > max_user_rec:
            raise HTTPException(status_code=423, detail=f"You can't send requests.")


async def valid_token(request: Request):
    try:
        # cookie_token = await security.get_access_token_from_request(request)
        data = await security.access_token_required(request)
    except exceptions.MissingTokenError as e:
        raise HTTPException(status_code=401, detail=f"Undefined token in cookie")
    except exceptions.JWTDecodeError as e:
        raise HTTPException(status_code=422, detail=f"Invalid token or the access token has expired.")

    return data


async def valid_user_statuses(data, statuses, session):
    if session is None:
        session = new_session()
        lock = False
    else:
        lock = True

    user = await session.get(UserModel, data)

    if statuses == StatusEnum.all:
        return user

    if type(statuses) != list:
        statuses = [statuses]

    if user.status in statuses + [StatusEnum.zero]:
        if lock:
            return user
        await session.close()
        return None

    raise HTTPException(status_code=403, detail=f"Insufficient authority")

if __name__ == '__main__':
    print(hashing("string"))
