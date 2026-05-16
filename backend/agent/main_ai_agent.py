import json
import pathlib

from backend.agent.AgentModel import AIAModel
from backend.agent.question_pars import QP
from backend.core import CORE


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
            if tool_call.function.name == "search_small_kb":
                print("call search_small_kb")
                try:
                    d = json.loads(tool_call.function.arguments)
                    return await QP.new_question_litle(**d)
                except TypeError as er:
                    print("Error", er)

            elif tool_call.function.name == "search_large_qlist":
                print("call search_large_qlist")
                try:
                    d = json.loads(tool_call.function.arguments)
                    return await QP.new_question_big(**d)
                except TypeError as er:
                    print("Error", er)
            else:
                print("error call")

    async def ask_question(self, question):
        # try:
        #     d = json.loads(question)
        #     return await QP.new_question_big(**d)
        # except TypeError as er:
        #     print("Error", er)
        prompt = [
            {
                "role": "system",
                "content": self.prompt1
            },
            {
                "role": "user",
                "content": question
            }
        ]

        response = await self.ai_model.send_message(prompt)
        message = response.choices[0].message
        if message.tool_calls:
            new_data_for_agent = await self.tools_call(message.tool_calls)
        else:
            new_data_for_agent = message.content

        return new_data_for_agent


main_agent = MainAgent()
