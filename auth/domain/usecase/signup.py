from models import users as user_model
from schemas.users import CreateUserSchema
from data import users as user_db_services
from sqlalchemy.orm import Session
from exception.user import UserAlreadyExistsException, InvalidPasswordException
import re
from fastapi import BackgroundTasks
from dependencies.notification_initialiser import AsyncRequest
from .notification import createData


def signup_handler(
    payload: CreateUserSchema,
    session: Session,
    background_tasks: BackgroundTasks,
):
    found_user = None
    try:
        found_user = user_db_services.get_user_by_email(
            session=session, email=payload.email
        )
    except Exception as e:
        if found_user:
            raise UserAlreadyExistsException("User already exists")

        if not validate_password_strength(payload.hashed_password):
            raise InvalidPasswordException(
                "Password is not strong enough, must include two uppercase letters, one special case letter, two digits, three lowercase letters, and be of length 8."
            )
        payload.hashed_password = user_model.User.hash_password(payload.hashed_password)  # type: ignore

        createdUser = user_db_services.create_user(session, user=payload)
        # send notification to user
        json_notification_data = createData(
            email=payload.email, name=payload.full_name
        )
        background_tasks.add_task(
            AsyncRequest().post, "/notify", data=json_notification_data
        )

        return createdUser


def validate_password_strength(password: str):
    """
    Ensure string has two uppercase letters.
    Ensure string has one special case letter.
    Ensure string has two digits.
    Ensure string has three lowercase letters.
    Ensure string is of length 8.
    """
    # Define the regular expression pattern
    pattern = r"^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$"

    # Use re.match to check if the password matches the pattern
    if re.match(pattern, password):
        return True
    else:
        return False
