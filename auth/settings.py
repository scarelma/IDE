import os
import pytz

# import cloudinary

# Database url configuration

from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = "postgresql+psycopg2://{username}:{password}@{host}:{port}/{db_name}".format(
    host=os.getenv("POSTGRES_HOST"),
    port=os.getenv("POSTGRES_PORT"),
    db_name=os.getenv("POSTGRES_DB"),
    username=os.getenv("POSTGRES_USER"),
    password=os.getenv("POSTGRES_PASSWORD"),
)

REDIS_CONFIG = {
    "host": os.getenv("REDIS_HOST", "localhost"),
    "port": os.getenv("REDIS_PORT", 6379),
    "db": os.getenv("REDIS_DB", 0),
}

SECRET_KEY = os.getenv("SECRET_KEY")

INTERNAL_COMMUNICATION_SECRET = os.getenv("INTERNAL_COMMUNICATION_SECRET")

INTERNAL_COMMUNICATION_URL = os.getenv(
    "INTERNAL_COMMUNICATION_URL", "http://localhost:8000"
)


IST_TIMEZONE = pytz.timezone("Asia/Kolkata")

NOTIFICATION_BASE_URL = os.getenv(
    "NOTIFICATION_BASE_URL", "http://localhost:8000/notification"
)
