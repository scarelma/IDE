from models import users as user_model
from data import users as user_db_services

from sqlalchemy.orm import Session

from exception.user import InvalidTokenException


def getSignedInUserDetail(token: str, session: Session):
    try:
        user = user_model.User.decode_token(token)
        return user_db_services.get_user_by_email(
            session=session, email=user["email"]
        )
    except Exception as e:
        raise InvalidTokenException("Invalid token")


def get_private_user_from_id(session, id: int):
    return user_db_services.get_user_by_id(session=session, id=id)
