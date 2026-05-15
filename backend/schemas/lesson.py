import datetime

from pydantic import BaseModel


class LessonSchema(BaseModel):
    cod: int
    date: datetime.date
    week_day: int
    code_semester: int

    week_type: int
    subgroup: int
    hour: float | None
    name: str

    teacher: str
    auditorium: str
    groupID: int
    group: str
    lesson_number: int

    color: str

class LessonDateSchema(BaseModel):
    date: datetime.date

class LessonSchemaResponse(BaseModel):
    id: int
    lesson_number: int
    name: str
    room: str
    teacher: str

class LessonFilterSchema(BaseModel):
    date: datetime.date | None
    subgroup: int | None
    with_shared: bool
    groupID: int | None

# class LessonFilterSchema(BaseModel):
#     date: None
#     subgroup: None
#     groupID: None