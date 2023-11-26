from pydantic import BaseModel, Field, EmailStr


class UserBaseSchema(BaseModel):
    email: EmailStr
    
    # organisation: str
    # phone_number: str

    # email = Column(String(225), nullable=False, unique=True)
    # hashed_password = Column(LargeBinary, nullable=False)
    full_name : str
    year : str
    enrollment_number : str
    batch : str


class CreateUserSchema(UserBaseSchema):
    hashed_password: str = Field(alias="password")





class UserSchema(UserBaseSchema):
    id: int
    is_active: bool = Field(default=False)

    class Config:
        orm_mode = True
