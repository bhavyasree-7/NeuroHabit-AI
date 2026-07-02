from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.habit import (
    HabitCreate,
    HabitUpdate,
    HabitResponse,
)
from app.security import get_current_user
from app.services.habit_service import (
    create_habit,
    get_habits,
    get_habit,
    delete_habit,
)

router = APIRouter(
    prefix="/habits",
    tags=["Habits"],
)


@router.post("", response_model=HabitResponse)
def add_habit(
    habit: HabitCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_habit(
        db,
        current_user,
        habit.title,
        habit.description,
        habit.frequency,
    )


@router.get("", response_model=list[HabitResponse])
def list_habits(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_habits(db, current_user)


@router.delete("/{habit_id}")
def remove_habit(
    habit_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    habit = get_habit(db, habit_id, current_user)

    if habit is None:
        raise HTTPException(
            status_code=404,
            detail="Habit not found",
        )

    delete_habit(db, habit)

    return {
        "message": "Habit deleted successfully"
    }