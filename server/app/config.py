from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    app_name: str = "XenoTrade API"
    mongo_url: str = "mongodb://localhost:27017"
    database_name: str = "xenotrade"
    jwt_secret: str = "your-secret-key"
    jwt_algorithm: str = "HS256"
    jwt_expiration: int = 30  # minutes

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()
