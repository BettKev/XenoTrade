from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import database, users  # Import the database and users table
import uvicorn

app = FastAPI()

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

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)