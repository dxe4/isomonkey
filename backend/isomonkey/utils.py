def custom_jwt_payload_handler(user):
    return {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
    }
