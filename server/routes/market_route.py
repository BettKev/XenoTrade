from fastapi import FastAPI, HTTPException, APIRouter, Depends
from pydantic import BaseModel
from models.market_model import MarketBase, MarketCreate, MarketResponse, StockBase, StockCreate, StockResponse
from app.database import database, stocks, markets
from sqlalchemy import insert
from datetime import datetime
from typing import List

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

# Route to fetch stock data
@router.get("/stocks", response_model=list[StockResponse])
async def fetch_stocks():
    query = stocks.select()
    try:
        stock_records = await database.fetch_all(query)
        return [StockResponse(**dict(stock)) for stock in stock_records]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/market_stats", response_model=List[MarketResponse])
async def create_market_stats(markets_list: List[MarketCreate]):
    try:
        query = insert(markets).returning(*markets.c)
        new_markets = []

        async with database.transaction():
            for market in markets_list:
                result = await database.fetch_one(query.values(
                    name=market.name,
                    symbol=market.symbol,
                    last_price=market.last_price,
                    change_percent=market.change_percent,
                    volume=market.volume,
                    updated_at=datetime.utcnow()
                ))
                new_markets.append(MarketResponse(**dict(result)))

        return new_markets
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Route to create a stock
@router.post("/stocks", response_model=StockResponse)
async def create_stock(stock: StockCreate):
    query = insert(stocks).values(
        name=stock.name,
        symbol=stock.symbol,
        price=stock.price,
        market_id=stock.market_id,  # Ensure this foreign key exists in the market table
        created_at=datetime.utcnow()
    ).returning(*stocks.c)

    try:
        new_stock = await database.fetch_one(query)
        return StockResponse(**dict(new_stock))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
