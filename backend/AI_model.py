from openai import AsyncOpenAI

class AIModel:
    model_url: str
    model_name: str
    token: str


    def __init__(self, base_url: str, model_name: str, api_key: str):
        self.client = AsyncOpenAI(
            api_key=api_key,
            base_url=f"{base_url}",
        )
        self.model_name = model_name
        self.model_url = f"{base_url}"

    async def send_question(self, history):
        stream = await self.client.chat.completions.create(
            model=self.model_name,
            messages=history,
            stream=False,
        )

        return stream

