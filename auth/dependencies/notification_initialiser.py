import httpx

from settings import NOTIFICATION_BASE_URL


class AsyncRequest:
    def __init__(self, base_url=NOTIFICATION_BASE_URL):
        self.client = httpx.AsyncClient(base_url=base_url)

    async def get(self, route, params=None):
        response = await self.client.get(route, params=params)
        await self.client.aclose()
        return response

    async def post(self, route, data=None):
        response = await self.client.post(
            route, json=data, headers={"Content-Type": "application/json"}
        )
        await self.client.aclose()
        return response

    async def put(self, route, data=None):
        response = await self.client.put(route, json=data)
        await self.client.aclose()
        return response

    async def delete(self, route, data=None):
        response = await self.client.delete(route, json=data)
        await self.client.aclose()
        return response
