import redis
from fastapi import HTTPException
import logging

# Create a custom logger
logger = logging.getLogger(__name__)
from settings import REDIS_CONFIG


class RedisClient:
    def __init__(self, config):
        self.config = config
        self.client = None

    def __enter__(self):
        self.client = redis.StrictRedis(**self.config)
        return self.client

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.client:
            self.client.close()

    # redis_client = redis.StrictRedis(**REDIS_CONFIG)

    # Use the get_redis_client dependency in your route function
    @staticmethod
    def add_key_to_redis(key: str):
        try:
            redis_client = get_redis_client()
            redis_client.setex(key, 1800, "invalid")
            return True  # Token invalidated successfully
        except Exception as e:
            # Handle any exceptions (e.g., Redis operation error)
            logger.info(f"Error invalidating token: {str(e)}")
            return False  # Token invalidation failed

    @staticmethod
    def is_key_present_in_redis(key: str) -> bool:
        try:
            # redis_key = f"invalid_tokens:{key}"
            redis_client = get_redis_client()
            if redis_client.exists(key):
                return True
            return False  # Token is valid, return it
        except Exception as e:
            # Handle any exceptions (e.g., Redis operation error)
            logger.info(f"Error checking token validity: {str(e)}")
            raise HTTPException(
                status_code=401, detail="Token validation failed"
            )
            # Token validation failed


def get_redis_client() -> redis.StrictRedis:
    try:
        # Yield the Redis client using the context manager
        with RedisClient(config=REDIS_CONFIG) as redis_client:
            return redis_client
    except Exception as e:
        # Handle any exceptions (e.g., Redis connection error)
        logger.error(f"Error connecting to Redis: {str(e)}")
        raise HTTPException(
            status_code=500, detail="Failed to connect to Redis"
        )
