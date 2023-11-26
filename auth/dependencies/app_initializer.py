from starlette.templating import Jinja2Templates
from fastapi import FastAPI

import os

templates = Jinja2Templates(
    directory=os.path.abspath(os.path.expanduser("templates"))
)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    docs_url=None,  # Disable docs (Swagger UI)
    redoc_url=None,  # Disable redoc
)

origins = [
    "http://pms.suvidhaen.com",
    "https://pms.suvidhaen.com",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:57128",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
