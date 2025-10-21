from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import logging
import json

# ✅ Step 1: Configure logging so we can see what happens in the terminal
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# ✅ Step 2: Initialize FastAPI
app = FastAPI()

# ✅ Step 3: Allow your frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace * with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Step 4: Define request model
class SearchQuery(BaseModel):
    query: str

# ✅ Step 5: Endpoint to test if server is alive
@app.get("/")
def read_root():
    logging.info("Health check requested.")
    return {"message": "Server is running 🚀"}

# ✅ Step 6: Main search endpoint
@app.post("/api/search")
async def search_ollama(search: SearchQuery):
    try:
        # Log incoming search
        logging.info(f"Received search query: {search.query}")

        # ✅ Step 7: Build Ollama command
        cmd = ["ollama", "run", "phi3:mini", search.query]

        # Log the command being executed
        logging.info(f"Running Ollama command: {' '.join(cmd)}")

        # ✅ Step 8: Execute Ollama process and capture output
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)

        if result.returncode != 0:
            logging.error(f"Ollama error: {result.stderr}")
            raise HTTPException(status_code=500, detail="Ollama model error.")

        # ✅ Step 9: Log and return the result
        logging.info(f"Ollama output: {result.stdout.strip()}")
        return {"response": result.stdout.strip()}

    except subprocess.TimeoutExpired:
        logging.error("Ollama request timed out.")
        raise HTTPException(status_code=504, detail="Ollama request timed out.")
    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error.")

