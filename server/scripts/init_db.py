from prisma import Prisma
import asyncio
import os

async def init_database():
    prisma = Prisma()
    await prisma.connect()
    
    try:
        # Create initial admin user
        await prisma.user.create({
            'data': {
                'username': 'admin',
                'email': 'admin@xenotrade.com',
                'fullName': 'System Admin',
                'password': 'hashed_password_here'  # Remember to hash in production
            }
        })
        
        # Create some initial stocks
        stocks = [
            {'id': 'SCOM', 'name': 'Safaricom PLC', 'price': 38.25, 'change': 0.75, 'volume': 1500000},
            {'id': 'KCB', 'name': 'KCB Group PLC', 'price': 45.50, 'change': -0.25, 'volume': 800000},
        ]
        
        for stock_data in stocks:
            await prisma.stock.create({'data': stock_data})
            
    except Exception as e:
        print(f"Error seeding database: {e}")
        
    finally:
        await prisma.disconnect()

if __name__ == "__main__":
    asyncio.run(init_database())
