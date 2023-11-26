from settings import INTERNAL_COMMUNICATION_SECRET


def createData(email: str, name: str):
    """
    Create data to be sent to the notification service.
    """
    return {
        "email": email,
        "name": name,
        "event": "CreateUser",
        "secret": INTERNAL_COMMUNICATION_SECRET,
    }
