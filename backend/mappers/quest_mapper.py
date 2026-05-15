from dataclasses import dataclass
from typing import final

from backend.models.quest import QuestModel
from backend.schemas.quest import QuestSchema


@final
@dataclass(frozen=True, slots=True)
class QuestMapper:

    @staticmethod
    def to_schem(model: QuestModel, done: bool) -> QuestSchema:
        """
        Преобразует SQLAlchemy UserModel в Domain UserEntity.

        :param done:
        :param model: Экземпляр SQLAlchemy UserModel.

        :return: сущность Domain UserEntity.
        """

        return QuestSchema(
            id=model.id,
            label=model.label,
            description=model.description,
            xp=model.xp,
            done=done
        )


