from datetime import date

from sqlalchemy.orm import Session

from app.models.habit import Habit
from app.models.habit_log import HabitLog
from app.models.user import User


def create_habit(
    db: Session,
    user: User,
    title: str,
    description: str,
    frequency,
):
    habit = Habit(
        title=title,
        description=description,
        frequency=frequency,
        user_id=user.id,
    )

    db.add(habit)
    db.commit()
    db.refresh(habit)

    return habit


def get_habits(db: Session, user: User):
    return (
        db.query(Habit)
        .filter(Habit.user_id == user.id)
        .all()
    )


def get_habit(
    db: Session,
    habit_id: int,
    user: User,
):
    return (
        db.query(Habit)
        .filter(
            Habit.id == habit_id,
            Habit.user_id == user.id,
        )
        .first()
    )


def delete_habit(
    db: Session,
    habit: Habit,
):
    db.delete(habit)
    db.commit()


def complete_habit(
    db: Session,
    habit: Habit,
):
    already_completed = (
        db.query(HabitLog)
        .filter(
            HabitLog.habit_id == habit.id,
            HabitLog.completed_date == date.today(),
        )
        .first()
    )

    if already_completed:
        return False

    log = HabitLog(
        habit_id=habit.id,
    )

    db.add(log)
    db.commit()

    return True

def update_habit(
    db: Session,
    habit: Habit,
    title: str,
    description: str,
    frequency,
):
    habit.title = title
    habit.description = description
    habit.frequency = frequency

    db.commit()
    db.refresh(habit)

    return habit