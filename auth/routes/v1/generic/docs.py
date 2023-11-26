from fastapi.responses import PlainTextResponse

# from routes.v1.api import UserApi
from . import get_public_router
import yaml

from fastapi.openapi.docs import get_swagger_ui_html, get_redoc_html
from fastapi.openapi.utils import get_openapi

from fastapi import Depends, HTTPException, status
from domain.usecase.validation import get_current_username

from dependencies.app_initializer import app

# from main import app, templates

public_router = get_public_router()
# private_router = get_private_router()


@public_router.get("/swagger", include_in_schema=False)
async def swagger_yaml(username: str = Depends(get_current_username)):
    openapi_json = await openapi(username)
    swagger_yaml = yaml.dump(openapi_json, default_flow_style=False)
    return PlainTextResponse(swagger_yaml)


@public_router.get("/redoc", include_in_schema=False)
async def get_redoc_documentation(
    username: str = Depends(get_current_username),
):
    if not username or username == "":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return get_redoc_html(openapi_url="/a/openapi.json", title="docs")


@public_router.get("/docs", include_in_schema=False)
async def get_documentation(username: str = Depends(get_current_username)):
    return get_swagger_ui_html(openapi_url="/a/openapi.json", title="docs")


@public_router.get("/openapi.json", include_in_schema=False)
async def openapi(username: str = Depends(get_current_username)):
    return get_openapi(title=app.title, version=app.version, routes=app.routes)
