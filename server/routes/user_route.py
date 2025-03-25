from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel
from models.user_model import UserCreate
from app.database import database, users  # Import the database and users table
from sqlalchemy import select
from passlib.context import CryptContext

router = APIRouter()

# Initialize bcrypt password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserLogin(BaseModel):
    email: str
    password: str

# User registration route
@router.post("/register/")
async def register_user(user: UserCreate):
    query = users.insert().values(
        email=user.email,
        full_name=user.full_name,
        password=user.password,
    )
    try:
        last_record_id = await database.execute(query)
        return {"id": last_record_id, **user.dict()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# User login route
@router.post("/login/")
async def login_user(user: UserLogin):
    query = select(users).where(users.c.email == user.email)
    db_user = await database.fetch_one(query)

    if db_user is None:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # Verify the password using bcrypt
    if not pwd_context.verify(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return {"message": "Login successful", "user": {"id": db_user["id"], "email": db_user["email"]}}

# Fetch users route
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
