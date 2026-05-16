import datetime

from pydantic import BaseModel


class TicketSchema(BaseModel):
    id: int
    date: datetime.datetime
    question: str

class AnswerTicketSchema(BaseModel):
    id: int
    answer: str
