from pydantic import BaseModel
from typing import Optional

from app.models.enums import HabitFrequency


class HabitCreate(BaseModel):
    title: str
    description: Optional[str] = None
    frequency: HabitFrequency


class HabitUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    frequency: Optional[HabitFrequency] = None
    completed: Optional[bool] = None


class HabitResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    frequency: HabitFrequency
    completed: bool

    class Config:
        from_attributes = True