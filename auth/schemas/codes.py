from pydantic import BaseModel, Field, EmailStr


class CodeBaseSchema(BaseModel):
    code_title: str
    code_language: int
    code: str
    code_input: str
    code_output: str


class CodeInternalSchema(CodeBaseSchema):
    # id: int
    user_id: str

    class Config:
        orm_mode = True