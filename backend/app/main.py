from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models.user import User
from app.api.auth import router as auth_router
from app.api.users import router as users_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="NeuroHabit AI",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_router)
app.include_router(users_router)

@app.get("/")
def root():
    return {
        "message": "NeuroHabit AI Backend Running 🚀"
    }