from datetime import date, timedelta

from sqlalchemy.orm import Session

from app.models.habit import Habit
from app.models.habit_log import HabitLog
from app.models.user import User


def calculate_streak(db: Session, user: User) -> int:
    streak = 0
    current_day = date.today()

    while True:
        completed = (
            db.query(HabitLog)
            .join(Habit)
            .filter(
                Habit.user_id == user.id,
                HabitLog.completed_date == current_day,
            )
            .first()
        )

        if completed:
            streak += 1
            current_day -= timedelta(days=1)
        else:
            break

    return streak
def calculate_xp(db: Session, user: User) -> int:
    completed = (
        db.query(HabitLog)
        .join(Habit)
        .filter(Habit.user_id == user.id)
        .count()
    )

    return completed * 10
def today_progress(db: Session, user: User):
    total = (
        db.query(Habit)
        .filter(Habit.user_id == user.id)
        .count()
    )

    completed = (
        db.query(HabitLog)
        .join(Habit)
        .filter(
            Habit.user_id == user.id,
            HabitLog.completed_date == date.today(),
        )
        .count()
    )

    return completed, total