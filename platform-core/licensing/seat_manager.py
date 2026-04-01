class SeatLimitExceeded(Exception):
    pass


def enforce_seat_limit(active_users: int, seat_limit: int):
    if active_users >= seat_limit:
        raise SeatLimitExceeded(
            f"Seat limit reached: {active_users}/{seat_limit}"
        )
