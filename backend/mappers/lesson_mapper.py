from dataclasses import dataclass
from typing import final

from backend.models.lesson import LessonModel
from backend.schemas.lesson import LessonSchemaResponse


@final
@dataclass(frozen=True, slots=True)
class LessonMapper:

    @staticmethod
    def to_schem(model: LessonModel) -> LessonSchemaResponse:
        """
        Преобразует SQLAlchemy UserModel в Domain UserEntity.

        :param model: Экземпляр SQLAlchemy UserModel.

        :return: сущность Domain UserEntity.
        """

        return LessonSchemaResponse(
            id=model.id,
            lesson_number=model.lesson_number,
            name=model.name,
            room=model.auditorium,
            teacher=model.teacher,
        )


