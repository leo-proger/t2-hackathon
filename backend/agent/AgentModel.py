from time import sleep

from backend.agent.AI_model import AIModel

tools  = [
    {
        "type": "function",
        "function": {
            "name": "search_small_kb",
            "description": "Быстрый поиск по малой базе знаний (FAQ) для простых, однозначных вопросов о университете.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Текст вопроса пользователя, возможно, слегка нормализованный."
                    }
                },
                "required": ["query"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "search_large_qlist",
            "description": "Сложный семантический поиск по большому корпусу вопросов и ответов для нетривиальных, развёрнутых или уникальных запросов.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Полный текст вопроса пользователя."
                    }
                },
                "required": ["query"]
            }
        }
    }
]


class AIAModel(AIModel):

    async def send_message(self, history):
        stream = await self.client.chat.completions.create(
            model=self.model_name,
            tools=tools,
            messages=history,

            stream=False,
        )

        return stream
