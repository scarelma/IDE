from data import users as user_db_services
from models import users as user_model
from exception.user import UserNotFoundException, InvalidCredentials


def login_handler(session, username: str, password: str) -> user_model.User:
    try:
        user: user_model.User = user_db_services.get_user_by_rollno(
            session=session, rollno=username
        )
        is_validated: bool = user.validate_password(password)
        if not is_validated:
            raise InvalidCredentials("Invalid credentials")
        return user
    except Exception as e:
        raise UserNotFoundException("User not found")
