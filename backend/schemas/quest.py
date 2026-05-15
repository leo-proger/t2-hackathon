from pydantic import BaseModel


class QuestSchema(BaseModel):
    id: int
    label: str
    description: str
    xp: int
    done: bool
