import asyncio
import pathlib
import json

from backend.agent.AI_model import AIModel
from backend.core import CORE


def get_answer(answers: dict[str, str], n: int) -> str:
    # print(dict(enumerate(answers)))
    # print(list(zip(enumerate(answers))))
    return answers[dict(enumerate(answers))[n]]


class QuestionParser:
    questions: dict[str, str]
    ai_model: AIModel
    prompt1 = str
    prompt2 = str
    prompt_lite = str

    def __init__(self):
        self.questions = {}
        with pathlib.Path('data_files/prompt_question_answer.md').open('r', encoding='utf-8') as f:
            self.prompt1 = f.read()

        with pathlib.Path('data_files/prompt_question_answer2.md').open('r', encoding='utf-8') as f:
            self.prompt2 = f.read()

        with pathlib.Path('data_files/knowledge_base.md').open('r', encoding='utf-8') as f:
            self.prompt_lite = f.read()

        self.ai_model = AIModel(
            CORE.model_url, CORE.model_name, CORE.api_key
        )
        self.__update_questions()

    async def new_question_litle(self, query: str):
        raw_answer = await self.ai_model.send_question([
            {
                "role": "system",
                "content": self.prompt_lite
            },
            {
                "role": "user",
                "content": query
            }
        ])

        return raw_answer.choices[0].message.content

    async def new_question_big(self, query: str):
        raw_answer = await self.ai_model.send_question([
            {
                "role": "system",
                "content": self.prompt1
            },
            {
                "role": "user",
                "content": f"""Новый запрос: {query}
Существующие вопросы: {list(enumerate(self.questions))}"""
            }
        ])

        result: dict[str, str | int | None | list[int]]

        try:
            raw_json = raw_answer.choices[0].message.content
            result = json.loads(raw_json)
        except json.JSONDecodeError:
            result = {"type": "none", "main": None, "near": []}


        if result["type"] == "none":
            answer = None
        elif result["type"] == "main":
            answer = get_answer(self.questions, result["main"])

        elif result["type"] == "near":
            answers = []

            for i in result["near"]:
                answers.append(
                    get_answer(self.questions, i)
                )

            raw_answer = await self.ai_model.send_question([
                {
                    "role": "system",
                    "content": self.prompt1
                },
                {
                    "role": "user",
                    "content": f"""Вопрос пользователя: {query}
Похожие ответы: {answers}"""
                }
            ])
            answer = raw_answer.choices[0].message.content
        else:
            raise TypeError


        # print(result)
        # print(answers)
        return answer

    def get_question(self) -> dict[str, str]:
        return self.questions

    def add_answer(self, question: str, answer: str) -> None:
        self.questions[question] = answer
        with pathlib.Path('data_files/question_base.json').open('w', encoding="utf-8") as f:
            f.write(json.dumps(self.questions))

    def __update_questions(self):
        with pathlib.Path('data_files/question_base.json').open("r", encoding='utf-8') as f:
            self.questions = json.load(f)



QP = QuestionParser()

if __name__ == '__main__':
    # print(get_answer({"qwer": "asd", "asdf": "zxc", "rtyu": "FGH"}, 2))
    # print(QP.get_question())
    # QP.add_answer("Как дела?", 'Хорошо')
    # QP.add_answer("Какая погода?", 'Хорошая')
    # QP.add_answer("Дела сделал?", 'Нет')
    # QP.add_answer("Всё плохо", 'Да')
    asyncio.run(QP.new_question("Как дела?"))
    # QP.add_answer("question", 'answer')
    # print(QP.get_question())
