from sqlalchemy.orm import Session

from data import users as user_db_services
from settings import INTERNAL_COMMUNICATION_SECRET
from exception.user import (
    CommunicationChannelNotVerifiedException,
)
import secrets
import logging

# Create a custom logger
logger = logging.getLogger(__name__)

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBasicCredentials, HTTPBasic


from dependencies.db_initializer import oauth2_scheme
from dependencies.redis_initializer import RedisClient


def isInternalCommunicationChannelVerified(secret: str) -> bool:
    if INTERNAL_COMMUNICATION_SECRET == secret:
        return True
    else:
        raise CommunicationChannelNotVerifiedException("Invalid secret")


def isUserValid(session: Session, id: int) -> dict:
    try:
        user_db_services.get_user_by_id(session=session, id=id)
        return {"user_id": id, "valid": True}
    except:
        return {"user_id": id, "valid": False}
        # raise UserNotFoundException("Invalid user id, user not found")


class TokenValidation:
    @staticmethod
    def invalidate_token(token: str = Depends(oauth2_scheme)) -> bool:
        """
        Invalidate a user's token by storing it in Redis with an expiration time.
        """
        try:
            # Connect to the Redis server
            return RedisClient.add_key_to_redis(key=f"invalid_tokens:{token}")
            # Set the token as a key in Redis with an expiration time (e.g., 30 minutes)

        except Exception as e:
            # Handle any exceptions (e.g., Redis connection error)
            logger.info(f"Error invalidating token: {str(e)}")
            return False  # Token invalidation failed

    @staticmethod
    def is_token_invalid(token: str = Depends(oauth2_scheme)) -> str:
        try:
            # Connect to the Redis server
            if RedisClient.is_key_present_in_redis(
                key=f"invalid_tokens:{token}"
            ):
                raise HTTPException(
                    status_code=401, detail="Token validation failed"
                )
            else:
                return token  # Token is valid, return it
        except Exception as e:
            # Handle any exceptions (e.g., Redis connection error)
            logger.info(f"Error checking token validity: {str(e)}")
            raise HTTPException(
                status_code=401, detail="Token validation failed"
            )


security = HTTPBasic()


def get_current_username(
    credentials: HTTPBasicCredentials = Depends(security),
):
    correct_username = secrets.compare_digest(credentials.username, "user")
    correct_password = secrets.compare_digest(credentials.password, "password")
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username
