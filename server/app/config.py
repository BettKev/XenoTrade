from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    app_name: str = "XenoTrade API"
    database_url: str = "sqlite:///./xenotrade.db"
    jwt_secret: str = "your-secret-key"
    jwt_algorithm: str = "HS256"
    jwt_expiration: int = 30  # minutes

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()
