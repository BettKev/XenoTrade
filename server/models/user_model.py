from pydantic import BaseModel, field_validator
from passlib.context import CryptContext

# Initialize Passlib bcrypt context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str

    @field_validator("password")
    @classmethod
    def hash_password(cls, value: str) -> str:
        """Automatically hash the password when setting it."""
        return pwd_context.hash(value)
