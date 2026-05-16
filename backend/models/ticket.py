import datetime
from sqlalchemy.orm import Mapped

from backend.database import Base, intpk

class TicketModel(Base):
    __tablename__ = 'ticket'

    id: Mapped[intpk]

    date: Mapped[datetime.datetime]
    question: Mapped[str]
    who_asked: Mapped[int]
