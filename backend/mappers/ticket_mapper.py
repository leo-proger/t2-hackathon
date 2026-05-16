from dataclasses import dataclass
from typing import final

from backend.models.ticket import TicketModel
from backend.schemas.ticket import TicketSchema


@final
@dataclass(frozen=True, slots=True)
class TicketMapper:

    @staticmethod
    def to_schem(model: TicketModel) -> TicketSchema:
        """
        Преобразует SQLAlchemy UserModel в Domain UserEntity.

        :param model: Экземпляр SQLAlchemy UserModel.

        :return: сущность Domain UserEntity.
        """

        return TicketSchema(
            id=model.id,
            date=model.date,
            question=model.question
        )


