from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel
from models.user_model import UserCreate
from app.database import database, users  # Import the database and users table
from sqlalchemy import select

router = APIRouter()

# User registration route
@router.post("/register/")
async def register_user(user: UserCreate):
    query = users.insert().values(
        username=user.username,
        email=user.email,
        full_name=user.full_name,
        disabled=user.disabled,
    )
    try:
        last_record_id = await database.execute(query)
        return {"id": last_record_id, **user.dict()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#Fetch users route
@router.get("/users/")
async def fetch_users():
    query = select(users)
    try:
        user_records = await database.fetch_all(query)
        # Convert each record to a dictionary
        user_list = [dict(user) for user in user_records]
        return {"users": user_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))