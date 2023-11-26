from domain.usecase.validation import TokenValidation


def logout(token: str):
    return TokenValidation.invalidate_token(token)
