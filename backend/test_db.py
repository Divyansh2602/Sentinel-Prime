import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

async def test_db():
    uri = "mongodb+srv://divyansh2622005:Divyansh%40mongo1@cluster0.hz2cjji.mongodb.net/?appName=Cluster0"
    print(f"Connecting to {uri}...")
    try:
        client = AsyncIOMotorClient(uri, serverSelectionTimeoutMS=5000)
        # The ismaster command is cheap and does not require auth.
        await client.admin.command('ismaster')
        print("MongoDB connection successful!")
    except Exception as e:
        print(f"MongoDB connection failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_db())
