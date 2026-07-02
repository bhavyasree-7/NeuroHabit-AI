from sqlalchemy.orm import Session

from app.models.habit import Habit
from app.models.user import User


def create_habit(db: Session, user: User, title: str, description: str, frequency: str):
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


def get_habit(db: Session, habit_id: int, user: User):
    return (
        db.query(Habit)
        .filter(
            Habit.id == habit_id,
            Habit.user_id == user.id,
        )
        .first()
    )


def delete_habit(db: Session, habit: Habit):
    db.delete(habit)
    db.commit()