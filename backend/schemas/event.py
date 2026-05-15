import datetime

from pydantic import BaseModel, HttpUrl

class EventSchema(BaseModel):

    title: str

    datatime_start: datetime.datetime
    duration: datetime.timedelta

    description: str
    limit_participants: int | None
    registration_link: HttpUrl | None
