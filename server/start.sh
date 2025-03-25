#!/bin/bash

# Activate the virtual environment
source venv/bin/activate

# Wait for a moment to ensure the virtual environment is activated
sleep 5

# Run the FastAPI server with Uvicorn
uvicorn app.app:app --reload
