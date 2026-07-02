from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.habit import (
    HabitCreate,
    HabitResponse,
)
from app.security import get_current_user
from app.services.habit_service import (
    create_habit,
    get_habits,
    get_habit,
    delete_habit,
    complete_habit,
    update_habit,
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
        db=db,
        user=current_user,
        title=habit.title,
        description=habit.description,
        frequency=habit.frequency,
    )


@router.get("", response_model=list[HabitResponse])
def list_habits(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_habits(
        db=db,
        user=current_user,
    )


@router.patch("/{habit_id}/complete")
def mark_complete(
    habit_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    habit = get_habit(
        db=db,
        habit_id=habit_id,
        user=current_user,
    )

    if habit is None:
        raise HTTPException(
            status_code=404,
            detail="Habit not found",
        )

    success = complete_habit(
        db=db,
        habit=habit,
    )

    if not success:
        raise HTTPException(
            status_code=400,
            detail="Habit already completed today",
        )

    return {
        "message": "Habit completed successfully"
    }
@router.put("/{habit_id}", response_model=HabitResponse)
def edit_habit(
    habit_id: int,
    updated_habit: HabitCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    habit = get_habit(
        db=db,
        habit_id=habit_id,
        user=current_user,
    )

    if habit is None:
        raise HTTPException(
            status_code=404,
            detail="Habit not found",
        )

    return update_habit(
        db=db,
        habit=habit,
        title=updated_habit.title,
        description=updated_habit.description,
        frequency=updated_habit.frequency,
    )

@router.delete("/{habit_id}")
def remove_habit(
    habit_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    habit = get_habit(
        db=db,
        habit_id=habit_id,
        user=current_user,
    )

    if habit is None:
        raise HTTPException(
            status_code=404,
            detail="Habit not found",
        )

    delete_habit(
        db=db,
        habit=habit,
    )

    return {
        "message": "Habit deleted successfully"
    }