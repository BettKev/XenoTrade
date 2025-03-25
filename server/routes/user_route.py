from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from ..models.user_model import User
from app import app

# User registration route
@app.post("/register/")
async def register_user(user: User):
    # In a real application, you would save the user to a database here.
    # For this example, we'll just return the user data.
    # You should also add proper error handling and validation.
    if user.id == 1:
        raise HTTPException(status_code=400, detail="User with this ID already exists")
    return user