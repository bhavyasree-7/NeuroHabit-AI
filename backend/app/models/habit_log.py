from sqlalchemy import (
    Column,
    Integer,
    Date,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class HabitLog(Base):
    __tablename__ = "habit_logs"

    id = Column(Integer, primary_key=True, index=True)

    habit_id = Column(
        Integer,
        ForeignKey("habits.id"),
        nullable=False,
    )

    completed_date = Column(
        Date,
        server_default=func.current_date(),
    )

    habit = relationship(
        "Habit",
        back_populates="logs",
    )