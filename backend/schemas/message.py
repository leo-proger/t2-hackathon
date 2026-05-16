from pydantic import BaseModel

class MessageSchema(BaseModel):
    sessionId: str
    text: str
