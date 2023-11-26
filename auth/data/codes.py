from sqlalchemy.orm import Session

from models.code import Code
from schemas.codes import CodeBaseSchema, CodeInternalSchema

def get_code_by_id(session: Session, id: int):
    return session.query(Code).filter(Code.id == id).first()

def get_all_codes_by_user_id(session: Session, user_id: int):
    return session.query(Code).filter(Code.user_id == user_id).all()

def create_code(session: Session, code: CodeBaseSchema, user_id: int):
    db_code = Code(**code.dict(), user_id=user_id)
    session.add(db_code)
    session.commit()
    session.refresh(db_code)
    return db_code

def update_code_by_id(session: Session, id: int, code: CodeInternalSchema):
    try:
        db_code = get_code_by_id(session, id)
        db_code.code_title = code.code_title
        db_code.code_language = code.code_language
        db_code.code = code.code
        db_code.code_input = code.code_input
        db_code.code_output = code.code_output
        session.add(db_code)
        session.commit()
        session.refresh(db_code)
        return db_code
    except:
        return None

def delete_code(session: Session, code: Code):
    try:
        session.delete(code)
        session.commit()
        return True
    except Exception as e:
        print(e)
        return False
    
def delete_code_by_id(session: Session, id: int):
    try:
        session.query(Code).filter(Code.id == id).delete()
        session.commit()
        return True
    except Exception as e:
        print(e)
        return False
    
def delete_all_codes_by_user_id(session: Session, user_id: int):
    try:
        session.query(Code).filter(Code.user_id == user_id).delete()
        session.commit()
        return True
    except Exception as e:
        print(e)
        return False
    
def delete_all_codes(session: Session):
    try:
        session.query(Code).delete()
        session.commit()
        return True
    except Exception as e:
        print(e)
        return False
    
