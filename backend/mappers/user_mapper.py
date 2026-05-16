from dataclasses import dataclass
from typing import final

from backend.models.user import UserModel, StatusEnum
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
            level=model.xp // 100,
            status= "student" if model.status == StatusEnum.student else "teacher",
            levelProgress=model.xp % 100,
            adaptationProgress=model.adaptationProgress,
        )


