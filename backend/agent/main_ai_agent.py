import json
import pathlib

from backend.agent.AgentModel import AIAModel
from backend.agent.question_pars import QP
from backend.core import CORE


class MainAgent:
    def __init__(self):
        with pathlib.Path.cwd().joinpath('data_files/main_agent_prompt.md').open('r', encoding='utf-8') as f:
            self.prompt1 = f.read()

        self.ai_model = AIAModel(
            CORE.model_url, CORE.model_name, CORE.api_key
        )

    async def _call_tool(self, tool_call) -> str:
        """Вызывает инструмент и возвращает строку-результат."""
        name = tool_call.function.name
        print("call", tool_call)

        try:
            args = json.loads(tool_call.function.arguments)
        except (json.JSONDecodeError, TypeError):
            return "Ошибка при разборе аргументов инструмента."

        result = None
        if name == "search_small_kb":
            print("call search_small_kb")
            result = await QP.new_question_litle(**args)
        elif name == "search_large_qlist":
            print("call search_large_qlist")
            result = await QP.new_question_big(**args)
        else:
            print("unknown tool:", name)

        # Если база знаний не нашла ответ — передаём явный сигнал в модель
        return result if result is not None else "Информация по этому вопросу не найдена в базе знаний. Ответь исходя из своих знаний об университете."

    async def ask_question(self, question: str) -> str | None:
        messages = [
            {"role": "system", "content": self.prompt1},
            {"role": "user",   "content": question},
        ]

        # Первый вызов модели (может вернуть tool_calls)
        response = await self.ai_model.send_message(messages)
        message = response.choices[0].message

        if not message.tool_calls:
            return message.content

        # Добавляем ответ ассистента с tool_calls в историю
        messages.append(message)

        # Вызываем все инструменты и добавляем результаты
        for tool_call in message.tool_calls:
            tool_result = await self._call_tool(tool_call)
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": tool_result,
            })

        # Второй вызов — модель синтезирует финальный ответ на основе результатов
        final_response = await self.ai_model.send_message(messages)
        return final_response.choices[0].message.content


main_agent = MainAgent()
