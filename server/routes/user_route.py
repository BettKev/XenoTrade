from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel
from models.user_model import UserCreate
from app.database import database, users
from sqlalchemy import select
import bcrypt
from datetime import datetime, timedelta
from jose import JWTError, jwt
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# Replace CryptContext with direct bcrypt usage
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

# JWT settings
# Get the secret key
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class UserLogin(BaseModel):
    email: str
    password: str

# User registration route
@router.post("/register/")
async def register_user(user: UserCreate):
    # Hash the password before storing
    hashed_password = hash_password(user.password)
    query = users.insert().values(
        email=user.email,
        full_name=user.full_name,
        password=hashed_password,
    )
    try:
        last_record_id = await database.execute(query)
        return {"id": last_record_id, "email": user.email, "full_name": user.full_name}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# User login route
@router.post("/login/")
async def login_user(user: UserLogin):
    query = select(users).where(users.c.email == user.email)
    db_user = await database.fetch_one(query)

    if db_user is None:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # Create token data
    token_data = {
        "sub": str(db_user["id"]),
        "email": db_user["email"],
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    
    # Generate JWT token
    access_token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {"id": db_user["id"], "email": db_user["email"]}
    }

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


# User logout route
@router.post("/logout/")
async def logout_user():
    return {"message": "Logout successful. Please discard your token on the client-side."}