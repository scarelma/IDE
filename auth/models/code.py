from sqlalchemy import (
    LargeBinary,
    Column,
    String,
    Text,
    Integer,
    Boolean,
    UniqueConstraint,
    PrimaryKeyConstraint,
)

import jwt
import bcrypt

from dependencies.db_initializer import Base

import settings
from datetime import datetime, timedelta


class Code(Base):
    """Models a user table"""

    __tablename__ = "codes"
    id = Column(Integer, nullable=False, primary_key=True)
    user_id = Column(Integer, nullable=False, unique=False)
    code_title = Column(String(225), nullable=False)
    code_language = Column(String(225), nullable=False)
    code = Column(Text, nullable=False)
    code_output = Column(Text, nullable=False)
    code_input = Column(Text, nullable=False)

    PrimaryKeyConstraint("id", name="pk_code_id")

    def __repr__(self):
        """Returns string representation of model instance"""
        return "<User {code_title!r}>".format(code_title=self.code_title)

    
