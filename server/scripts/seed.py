import asyncio
from databases import Database
from app.database import database, markets, stocks  # Ensure this path matches your project structure

async def seed_database():
    await database.connect()

    # Check if the market already exists to avoid duplicate entries
    existing_market = await database.fetch_one(markets.select().where(markets.c.name == "Nairobi Securities Exchange"))
    
    if existing_market:
        market_id = existing_market["id"]
    else:
        # Insert Market
        query = markets.insert().values(name="Nairobi Securities Exchange")
        market_id = await database.execute(query)

    # Check if stocks already exist
    existing_stocks = await database.fetch_all(stocks.select())
    if not existing_stocks:
        # Insert Stocks
        stock_data = [
            {"symbol": "KCB", "name": "KCB Group", "price": 40.5, "market_id": market_id},
            {"symbol": "EABL", "name": "East African Breweries", "price": 180.0, "market_id": market_id},
            {"symbol": "SCOM", "name": "Safaricom PLC", "price": 23.5, "market_id": market_id},
            {"symbol": "EQTY", "name": "Equity Group Holdings", "price": 50.0, "market_id": market_id},
            {"symbol": "COOP", "name": "Co-operative Bank of Kenya", "price": 14.5, "market_id": market_id},
            {"symbol": "ABSA", "name": "Absa Bank Kenya", "price": 12.3, "market_id": market_id},
            {"symbol": "NBK", "name": "National Bank of Kenya", "price": 10.8, "market_id": market_id},
            {"symbol": "STANBIC", "name": "Stanbic Holdings", "price": 105.7, "market_id": market_id},
            {"symbol": "DTB", "name": "Diamond Trust Bank", "price": 54.2, "market_id": market_id},
            {"symbol": "HFCK", "name": "Housing Finance Group", "price": 3.9, "market_id": market_id},
            {"symbol": "JUB", "name": "Jubilee Holdings", "price": 280.0, "market_id": market_id},
            {"symbol": "CIC", "name": "CIC Insurance Group", "price": 2.2, "market_id": market_id},
            {"symbol": "KENN", "name": "Kenya Reinsurance Corporation", "price": 2.4, "market_id": market_id},
            {"symbol": "BAMB", "name": "Bamburi Cement", "price": 38.6, "market_id": market_id},
            {"symbol": "ARM", "name": "ARM Cement", "price": 5.7, "market_id": market_id},
            {"symbol": "KENGEN", "name": "Kenya Electricity Generating Company", "price": 4.1, "market_id": market_id},
            {"symbol": "KPLC", "name": "Kenya Power & Lighting Co", "price": 1.8, "market_id": market_id},
            {"symbol": "TOTL", "name": "Total Kenya", "price": 23.7, "market_id": market_id},
            {"symbol": "UCHM", "name": "Uchumi Supermarkets", "price": 0.2, "market_id": market_id},
            {"symbol": "SCAN", "name": "Scangroup", "price": 3.1, "market_id": market_id},
            {"symbol": "TPSE", "name": "TPS Eastern Africa", "price": 15.5, "market_id": market_id},
            {"symbol": "KQ", "name": "Kenya Airways", "price": 1.4, "market_id": market_id},
            {"symbol": "SANLAM", "name": "Sanlam Kenya", "price": 9.8, "market_id": market_id},
            {"symbol": "NBV", "name": "Nairobi Business Ventures", "price": 3.3, "market_id": market_id},
            {"symbol": "UMME", "name": "Umeme Limited", "price": 7.5, "market_id": market_id},
            {"symbol": "FAULU", "name": "Faulu Microfinance Bank", "price": 2.9, "market_id": market_id},
            {"symbol": "ICDC", "name": "Industrial & Commercial Dev. Corp", "price": 6.7, "market_id": market_id},
            {"symbol": "WPP", "name": "WPP Scangroup", "price": 4.5, "market_id": market_id},
            {"symbol": "FTGH", "name": "Flame Tree Group Holdings", "price": 1.3, "market_id": market_id},
        ]
        await database.execute_many(stocks.insert(), stock_data)

    print("Database seeded successfully!")
    await database.disconnect()

if __name__ == "__main__":
    asyncio.run(seed_database())
