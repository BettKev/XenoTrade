from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from .config import get_settings
from .routes import auth, stocks, market_data, ws

app = FastAPI(title="XenoTrade API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React development server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    settings = get_settings()
    app.mongodb_client = AsyncIOMotorClient(settings.mongo_url)
    app.database = app.mongodb_client[settings.database_name]

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

# Include routers
app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(stocks.router, prefix="/api", tags=["stocks"])
app.include_router(market_data.router, prefix="/api", tags=["market_data"])
app.include_router(ws.router, tags=["websocket"])

@app.get("/")
async def root():
    return {"message": "Welcome to XenoTrade API"}
