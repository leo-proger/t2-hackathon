from sqlalchemy.orm import Mapped

from backend.database import Base, intpk


class QuestModel(Base):
    __tablename__ = 'quests'

    id: Mapped[intpk]
    label: Mapped[str]
    description: Mapped[str]
    stadi: Mapped[int]
    xp: Mapped[int]

