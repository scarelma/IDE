from . import get_private_router, get_public_router

from typing import Dict

from fastapi import HTTPException, Depends, Body, BackgroundTasks
from fastapi.security import OAuth2PasswordRequestForm
from dependencies.http_initializer import codeClient
from sqlalchemy.orm import Session

from domain.usecase import (
    codes as codes_usecase,
    validation as validation_usecase,
    profile as profile_usecase,
)
from dependencies.db_initializer import get_db, oauth2_scheme

from schemas.codes import (
    CodeBaseSchema,
)

public_router = get_public_router()
private_router = get_private_router()

@private_router.post("/code", response_model=CodeBaseSchema)
def save_code(
    code: CodeBaseSchema = Body(...),
    session: Session = Depends(get_db),
    token: str = Depends(validation_usecase.TokenValidation.is_token_invalid),

    ):
    try:
        user = profile_usecase.getSignedInUserDetail(
            token=token, session=session
        )

        # execute code here by sending it to another service.
        response = codeClient.post_code_to_reciever({
            "langnumber": code.code_language,
            "code": code.code,
            "input": code.code_input
        })
        
        code.code_output = response.json()['output']

        code = codes_usecase.save_code_handler(
            session=session,
            code=code,
            user_id=user.id,
        )
        return code
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@private_router.get("/list-code", response_model={})
def list_code(
    session: Session = Depends(get_db),
    token: str = Depends(validation_usecase.TokenValidation.is_token_invalid),
    ):
    try:
        user = profile_usecase.getSignedInUserDetail(
            token=token, session=session
        )
        codes = codes_usecase.list_code_handler(
            session=session,
            user_id=user.id,
        )
        return codes
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))