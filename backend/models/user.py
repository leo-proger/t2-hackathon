import datetime
import enum

from sqlalchemy.orm import Mapped, mapped_column

from backend.database import Base, intpk


class StatusEnum(enum.Enum):
    zero = ""
    admin = "Админ"
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
    year: Mapped[int] = mapped_column(default=1)
    simestr: Mapped[int] = mapped_column(default=1)
    xp: Mapped[int] = mapped_column(default=0)
    level: Mapped[int] = mapped_column(default=0)
    adaptationProgress: Mapped[int] = mapped_column(default=0)

    subgroup: Mapped[int] = mapped_column(default=0)
    language: Mapped[str | None] = None
    status: Mapped[StatusEnum]
    passwordHash: Mapped[str]

    email: Mapped[str]
    date_of_birth: Mapped[datetime.date | None]

    quests: Mapped[int] = mapped_column(default=0)
    chat_history: Mapped[str] = mapped_column(default="")
    count_messages: Mapped[int] = mapped_column(default=0)

    # fullName: Mapped[str]
    # middle_name: Mapped[str | None]

    # events: Mapped[list["EventModel"]] = relationship(
    #     back_populates="registration_user",
    #     secondary="users_events_bind"
    # )