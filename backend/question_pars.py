import asyncio
import pathlib
import json

from backend.AI_model import AIModel
from backend.core import CORE


def get_answer(answers: dict[str, str], n: int) -> str:
    # print(dict(enumerate(answers)))
    # print(list(zip(enumerate(answers))))
    return answers[dict(enumerate(answers))[n]]


class QuestionParser:
    questions: dict[str, str]
    ai_model: AIModel
    prompt1 = str

    def __init__(self):
        self.questions = {}
        with pathlib.Path('prompt_question_answer.md').open('r') as f:
            self.prompt1 = f.read()

        self.ai_model = AIModel(
            CORE.model_url, CORE.model_name, CORE.api_key
        )
        self.__update_questions()


    async def new_question(self, question: str):
        list_questions = list(enumerate(self.questions))
        user_prompt = f"""Новый запрос: {question}
Существующие вопросы: {list_questions}"""
        prompt = [
            {
                "role": "system",
                "content": self.prompt1
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ]

        raw_answer = await self.ai_model.send_question(prompt)

        result: dict[str, str | int | None | list[int]]

        try:
            raw_json = raw_answer.choices[0].message.content
            result = json.loads(raw_json)
        except json.JSONDecodeError:
            result = {"type": "none", "main": None, "near": []}

        answers = []

        if result["type"] == "none":
            ...
        elif result["type"] == "main":
            answers.append(
                get_answer(self.questions, result["main"])
            )
        elif result["type"] == "near":
            for i in result["near"]:
                answers.append(
                    get_answer(self.questions, i)
                )

        print(result)
        print(answers)



    def get_question(self) -> dict[str, str]:
        return self.questions

    def add_answer(self, question: str, answer: str) -> None:
        self.questions[question] = answer
        with pathlib.Path('question_base.json').open('w', encoding="utf-8") as f:
            f.write(json.dumps(self.questions))

    def __update_questions(self):
        with pathlib.Path('question_base.json').open("r") as f:
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
