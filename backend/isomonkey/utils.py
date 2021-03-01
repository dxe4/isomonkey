def custom_jwt_payload_handler(user):
    return {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
    }


def jwt_get_username_from_payload(payload):
    # JWT_PAYLOAD_GET_USERNAME_HANDLER
    # TODO, add username, so we dont store email
    return payload['email']
