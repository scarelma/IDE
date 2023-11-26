import requests
from settings import INTERNAL_COMMUNICATION_URL


class HTTPClient:
    def __init__(self, base_url):
        self.base_url = base_url

    def _make_request(self, method, endpoint, data=None):
        url = f"{self.base_url}/{endpoint}"
        try:
            response = requests.request(method, url, json=data)
            response.raise_for_status()  # Raise an exception for HTTP errors
            return response
        except requests.exceptions.RequestException as e:
            raise Exception(f"Request error: {e}")
        except Exception as e:
            raise Exception(f"An error occurred: {e}")

    def get(self, endpoint):
        return self._make_request("GET", endpoint)

    def post(self, endpoint, data=None):
        return self._make_request("POST", endpoint, data)

    def put(self, endpoint, data=None):
        return self._make_request("PUT", endpoint, data)

    def delete(self, endpoint):
        return self._make_request("DELETE", endpoint)


class CodeClient(HTTPClient):
    def __init__(self, base_url):
        super().__init__(base_url)

    def get_languages(self):
        return self.get("api/v1/language")

    def post_code_to_reciever(self, payload):
        return self.post("api/v1/sendcode", payload)

    def get_health_check(self):
        return self.get("api/v1/serverhealth")



codeClient = CodeClient(INTERNAL_COMMUNICATION_URL)

