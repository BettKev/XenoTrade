from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import database, users  # Import the database and users table
from app import app

class UserCreate(BaseModel):
    username: str
    email: str
    full_name: str | None = None
    disabled: bool | None = None


@app.post("/register/")
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