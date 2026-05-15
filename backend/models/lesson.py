import datetime
y
from sqlalchemy.orm import Mapped

from backend.database import Base, intpk


# import enum
# class DayWeek(enum.Enum):
#     monday = "Понедельник"
#     tuesday = "Вторник"
#     wednesday = "Среда"
#     thursday = "Четверг"
#     friday = "Пятница"
#     saturday = "Суббота"
#     sunday = "Воскресенье"


class LessonModel(Base):
    __tablename__ = 'lessons'

    id: Mapped[intpk]

    cod: Mapped[int]
    date: Mapped[datetime.date]
    week_day: Mapped[int]
    code_semester: Mapped[int]

    week_type: Mapped[int]
    subgroup: Mapped[int]

    hour: Mapped[float | None]
    name: Mapped[str]

    teacher: Mapped[str]
    auditorium: Mapped[str]
    groupID: Mapped[int]
    lesson_number: Mapped[int]

    color: Mapped[str]

    group: Mapped[str]
