from abc import ABC, abstractmethod


class APIRouter(ABC):
    def __init__(self, public_router, private_router):
        self.public_router = public_router
        self.private_router = private_router

    @abstractmethod
    def get_public_router():
        pass

    @abstractmethod
    def get_private_router():
        pass
