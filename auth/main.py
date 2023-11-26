from routes.v1.api import DocsApi, UserApi
from routes.v1.api import CodeApi
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

from dependencies.app_initializer import app

app.include_router(
    UserApi.get_public_router(),
    prefix="/a/auth",
)

app.include_router(
    UserApi.get_private_router(),
    prefix="/a/auth",
)

app.include_router(
    DocsApi.get_public_router(),
    prefix="/a",
)

app.include_router(
    CodeApi.get_public_router(),
    prefix="/a/code",
)

app.include_router(
    CodeApi.get_private_router(),
    prefix="/a/code",
)