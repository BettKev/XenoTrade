from pydantic import BaseModel

# Pydantic models
class StockBase(BaseModel):
    symbol: str
    name: str
    price: float
    market_id: int

class StockCreate(StockBase):
    pass

class StockResponse(StockBase):
    id: int

    class Config:
        from_attributes = True

class MarketBase(BaseModel):
    name: str

class MarketCreate(MarketBase):
    pass

class MarketResponse(MarketBase):
    id: int

    class Config:
        from_attributes = True