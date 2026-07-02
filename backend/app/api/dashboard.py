from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.dashboard import DashboardResponse
from app.security import get_current_user

from app.services.dashboard_service import (
    calculate_streak,
    calculate_xp,
    today_progress,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("", response_model=DashboardResponse)
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    streak = calculate_streak(db, current_user)
    xp = calculate_xp(db, current_user)
    completed, total = today_progress(db, current_user)

    productivity = (
        int((completed / total) * 100)
        if total > 0
        else 0
    )

    return DashboardResponse(
        streak=streak,
        productivity=productivity,
        xp=xp,
        completed_habits=completed,
        total_habits=total,
        ai_message="Great work! Keep your streak alive 🔥",
    )