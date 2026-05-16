import datetime

from pydantic import BaseModel, EmailStr


class UserCreateSchema(BaseModel):
    groupID: int
    subgroup: int
    email: EmailStr


class UserNewDataSchema(BaseModel):

    surname: str# | None
    name: str# | None
    middle_name: str# | None

    date_of_birth: datetime.date# | None

class UserMeSchema(BaseModel):
    id: int
    name: str
    faculty:str
    group: str
    year: int
    simestr: int
    xp: int
    level: int
    levelProgress: int
    adaptationProgress: int


class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str

class UserResetPassword(BaseModel):
    old_password: str
    new_password: str
