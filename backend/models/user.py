import datetime
import enum

from sqlalchemy.orm import Mapped

from backend.database import Base, intpk


class StatusEnum(enum.Enum):
    zero = ""
    admin = "Админ"
    moderator = "Модератор"
    teacher = "Преподаватель"
    student = "Студент"
    all = "Вcе"
    none = "None"


class UserModel(Base):
    __tablename__ = 'users'

    id: Mapped[intpk]
    group: Mapped[str]
    groupID: Mapped[int]

    name: Mapped[str]
    surname: Mapped[str]
    faculty: Mapped[str]
    year: Mapped[int] = 1
    simestr: Mapped[int] = 0
    xp: Mapped[int] = 0
    level: Mapped[int] = 0
    adaptationProgress: Mapped[int] = 0

    subgroup: Mapped[int] = 0
    language: Mapped[str | None] = None
    status: Mapped[StatusEnum]
    passwordHash: Mapped[str]

    email: Mapped[str]
    date_of_birth: Mapped[datetime.date | None]

    quests: Mapped[int] = 0

    # fullName: Mapped[str]
    # middle_name: Mapped[str | None]

    # events: Mapped[list["EventModel"]] = relationship(
    #     back_populates="registration_user",
    #     secondary="users_events_bind"
    # )