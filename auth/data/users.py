from sqlalchemy.orm import Session

from models.users import User
from schemas.users import CreateUserSchema


def create_user(session: Session, user: CreateUserSchema):
    db_user = User(**user.model_dump())
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def list_users(session: Session):
    try:
        return session.query(User).all()
    except Exception as e:
        print(e)
        return []


def get_user_by_email(session: Session, email: str):
    return session.query(User).filter(User.email == email).one()


def get_user_by_id(session: Session, id: int):
    return session.query(User).filter(User.id == id).one()

def get_user_by_rollno(session: Session, rollno: str):
    return session.query(User).filter(User.enrollment_number == rollno).one()



def update_user(session: Session, user: User):
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


def delete_user(session: Session, user: User):
    try:
        session.delete(user)
        session.commit()
        return True
    except Exception as e:
        print(e)
        return False


def delete_user_by_id(session: Session, id: int):
    try:
        session.query(User).filter(User.id == id).one()
        session.query(User).filter(User.id == id).delete()
        session.commit()
        return True
    except Exception as e:
        print(e)
        return False


def delete_user_by_email(session: Session, email: str):
    try:
        session.query(User).filter(User.email == email).one()
        session.query(User).filter(User.email == email).delete()
        session.commit()
        return True
    except Exception as e:
        print(e)
        return False
