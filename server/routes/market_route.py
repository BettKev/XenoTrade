from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel
from models.market_model import MarketBase, MarketCreate, MarketResponse, StockBase, StockCreate, StockResponse
from app.database import database, stocks, markets
from sqlalchemy import select
from datetime import datetime, timedelta


router = APIRouter()

# Route to fetch market data
@router.get("/market_stats", response_model=list[MarketResponse])
async def fetch_markets():
    query = markets.select()
    try:
        market_records = await database.fetch_all(query)
        return [MarketResponse(**dict(market)) for market in market_records]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Route to fetch market data
@router.get("/stocks", response_model=list[StockResponse])
async def fetch_stocks():
    query = stocks.select()
    try:
        stock_records = await database.fetch_all(query)
        return [StockResponse(**dict(stock)) for stock in stock_records]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
