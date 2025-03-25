from fastapi import FastAPI
from app.database import database
from routes import user_route  # Import the user routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS middleware to allow cross-origin requests from the client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "http://localhost:5173",  # Replace with the origin of your React frontend
    "http://127.0.0.1:5173"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Index Route
@app.get("/")
async def root():
    return {"message": "This is XenoTrade Server"}

app.include_router(user_route.router)  # Include the user routes