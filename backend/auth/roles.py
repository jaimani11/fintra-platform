ROLE_ORDER = {
    "viewer": 0,
    "staff": 1,
    "accountant": 2,
    "manager": 3,
    "admin": 4,
    "owner": 5,
}


def has_permission(user_role: str, required_role: str) -> bool:
    return ROLE_ORDER.get(user_role, 0) >= ROLE_ORDER.get(required_role, 0)
