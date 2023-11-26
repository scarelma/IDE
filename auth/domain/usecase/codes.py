from data.codes import create_code, get_all_codes_by_user_id

def save_code_handler(session, code, user_id):
    return create_code(session, code, user_id)

def list_code_handler(session, user_id):
    return get_all_codes_by_user_id(session, user_id)