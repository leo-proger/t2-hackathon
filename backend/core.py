import json
import pathlib

class Core:
    model_url: str
    model_name: str
    api_key: str
    count_quests: int

    def __init__(self):
        with pathlib.Path("data_files/core.cr").open("r") as f:
            data = json.load(f)
            for key, value in data.items():
                self.__dict__[key] = value

CORE = Core()

if __name__ == "__main__":
    print(CORE.model_url)
