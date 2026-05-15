import datetime
import enum

# from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped#, relationship

from backend.database import Base, intpk#, group_id
# from backend.models.event import EventModel


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
    groupID: Mapped[int]
    subgroup: Mapped[int] = 0
    language: Mapped[str | None]

    status: Mapped[StatusEnum]

    fullName: Mapped[str]
    surname: Mapped[str | None]
    name: Mapped[str | None]
    middle_name: Mapped[str | None]
    passwordHash: Mapped[str]

    email: Mapped[str]
    date_of_birth: Mapped[datetime.date | None]

    group: Mapped[str | None]

    # events: Mapped[list["EventModel"]] = relationship(
    #     back_populates="registration_user",
    #     secondary="users_events_bind"
    # )