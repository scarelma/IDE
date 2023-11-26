from fastapi import APIRouter, Depends

from domain.usecase import validation as validation_usecase


def get_public_router():
    router = APIRouter()
    # router.prefix = "/"
    router.tags = ["public"]
    return router


def get_private_router():
    router = APIRouter()
    # router.prefix = "/"
    router.tags = ["private"]
    router.dependencies = [
        Depends(validation_usecase.TokenValidation.is_token_invalid)
    ]
    return router
