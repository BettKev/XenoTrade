from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from ..models.user import User, UserInDB, UserCreate
from ..services.auth import AuthService
from ..config import get_settings
from typing import Annotated

router = APIRouter()
auth_service = AuthService()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")

@router.post("/register", response_model=User)
async def register(user: UserCreate):
    return await auth_service.register_user(user)

@router.post("/login")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = await auth_service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth_service.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}
