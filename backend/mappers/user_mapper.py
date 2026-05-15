from dataclasses import dataclass
from typing import final

from backend.models.user import UserModel
from backend.schemas.user import UserMeSchema


@final
@dataclass(frozen=True, slots=True)
class UserMeMapper:

    @staticmethod
    def to_schem(model: UserModel) -> UserMeSchema:
        """
        Преобразует SQLAlchemy UserModel в Domain UserEntity.

        :param model: Экземпляр SQLAlchemy UserModel.

        :return: сущность Domain UserEntity.
        """

        return UserMeSchema(
            id=model.id,
            name=model.name,
            faculty=model.faculty,
            group=model.group,
            year=model.year,
            simestr=model.simestr,
            xp=model.xp,
            level=model.level,
            adaptationProgress=model.adaptationProgress,
        )


