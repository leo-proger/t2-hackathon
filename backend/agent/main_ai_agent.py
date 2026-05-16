import json
import pathlib

from openai import RateLimitError, APITimeoutError, APIConnectionError, APIStatusError

from backend.agent.AgentModel import AIAModel
from backend.agent.question_pars import QP
from backend.core import CORE

# Читабельные сообщения об ошибках для пользователя
_ERR_RATE_LIMIT  = "Слишком много запросов — попробуй через минуту."
_ERR_TIMEOUT     = "Ответ занял слишком долго. Попробуй ещё раз."
_ERR_CONNECTION  = "Не могу подключиться к серверу ИИ. Попробуй позже."
_ERR_EMPTY       = "Получил пустой ответ. Попробуй переформулировать вопрос."
_ERR_GENERIC     = "Произошла ошибка при обработке вопроса. Попробуй ещё раз."


class MainAgent:
    ai_model: AIAModel
    sistem_prompt1 = str

    def __init__(self):
        self.questions = {}
        with pathlib.Path.cwd().joinpath('data_files/main_agent_prompt.md').open('r', encoding='utf-8') as f:
            self.prompt1 = f.read()

        self.ai_model = AIAModel(
            CORE.model_url, CORE.model_name, CORE.api_key
        )

    async def tools_call(self, tool_calls):
        for tool_call in tool_calls:
            print("call", tool_call)
            try:
                d = json.loads(tool_call.function.arguments)
            except (json.JSONDecodeError, TypeError) as e:
                print("Error parsing tool arguments:", e)
                continue

            try:
                if tool_call.function.name == "search_small_kb":
                    print("call search_small_kb")
                    return await QP.new_question_litle(**d)

                elif tool_call.function.name == "search_large_qlist":
                    print("call search_large_qlist")
                    return await QP.new_question_big(**d)

                else:
                    print("unknown tool:", tool_call.function.name)

            except RateLimitError:
                return _ERR_RATE_LIMIT
            except APITimeoutError:
                return _ERR_TIMEOUT
            except APIConnectionError:
                return _ERR_CONNECTION
            except Exception as e:
                print("Tool call error:", e)
                return _ERR_GENERIC

        return None

    async def ask_question(self, question: str) -> str:
        prompt = [
            {"role": "system", "content": self.prompt1},
            {"role": "user",   "content": question},
        ]

        try:
            response = await self.ai_model.send_message(prompt)
            message = response.choices[0].message

            if message.tool_calls:
                result = await self.tools_call(message.tool_calls)
            else:
                result = message.content

            if not result:
                return _ERR_EMPTY

            return result

        except RateLimitError as e:
            print("RateLimitError:", e)
            return _ERR_RATE_LIMIT
        except APITimeoutError as e:
            print("APITimeoutError:", e)
            return _ERR_TIMEOUT
        except APIConnectionError as e:
            print("APIConnectionError:", e)
            return _ERR_CONNECTION
        except APIStatusError as e:
            print("APIStatusError:", e.status_code, e.message)
            return _ERR_GENERIC
        except Exception as e:
            print("Unexpected error in ask_question:", e)
            return _ERR_GENERIC


main_agent = MainAgent()
