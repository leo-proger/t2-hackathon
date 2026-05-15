from pathlib import Path

import uvicorn
from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from backend.api import main_router
from backend.secret_model import security


app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
# )

app.include_router(main_router)
security.handle_errors(app)


@app.get("/")
def root():
    """
    Открытие приветственной страницы.
    :return:
    """
    main_page_path = Path("../public/index.html")
    if not main_page_path.is_file():
        return {'success': True, "message": "Hello World"}
    return FileResponse(main_page_path)

if __name__ == '__main__':
    # uvicorn.run("main:app", host="10.50.55.114")  # , reload=True)
    uvicorn.run("main:app")
