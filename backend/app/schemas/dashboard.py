from pydantic import BaseModel

class DashboardResponse(BaseModel):
    streak: int
    productivity: int
    xp: int
    completed_habits: int
    total_habits: int
    ai_message: str