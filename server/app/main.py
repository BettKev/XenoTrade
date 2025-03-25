from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import get_settings
from .routes import auth, stocks, market_data, ws
from .database import init_db

app = FastAPI(title="XenoTrade API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await init_db()

# Include routers
app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(stocks.router, prefix="/api", tags=["stocks"])
app.include_router(market_data.router, prefix="/api", tags=["market_data"])
app.include_router(ws.router, tags=["websocket"])

@app.get("/")
async def root():
    return {"message": "Welcome to XenoTrade API"}
