from fastapi import APIRouter, Depends

from app.schemas.dashboard import DashboardResponse
from app.security import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)

@router.get("", response_model=DashboardResponse)
def get_dashboard(
    current_user: User = Depends(get_current_user),
):
    return DashboardResponse(
        streak=14,
        productivity=91,
        xp=1280,
        completed_habits=3,
        total_habits=5,
        ai_message="Great work! Your productivity improved by 12% this week."
    )