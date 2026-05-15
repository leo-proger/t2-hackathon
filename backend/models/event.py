import datetime
from sqlalchemy.orm import Mapped, relationship

from backend.database import Base, intpk

class EventModel(Base):
    __tablename__ = 'events'

    id: Mapped[intpk]
    title: Mapped[str]

    datatime_start: Mapped[datetime.datetime]
    duration: Mapped[datetime.timedelta]

    description: Mapped[str]

    limit_participants: Mapped[int | None]
    registration_link: Mapped[str | None]

    # registration_user: Mapped[list["UserModel"]] = relationship(
    #     back_populates="events",
    #     secondary="users_events_bind"
    # )
