# AIgent-Bear
=======
Combined Banking AI Guardrails App

Structure:
- backend/    -> Spring Boot app (port 8080)
- frontend/   -> React (Vite) app (dev server)
- fastapi/    -> Toy FastAPI guardrails + Q&A (port 8000)

Quick start:
1) FastAPI:
   cd fastapi
   # activate venv (Windows: venv\Scripts\activate)
   pip install -r requirements.txt (once)
   set up env with openai key ($env:OPENAI_API_KEY="your_api_key_here") -> echo $env:OPENAI_API_KEY
   uvicorn main:app --reload --port 8001
   check if port is listening using netstat -ano | findstr :8001
   request method to test : Invoke-RestMethod -Uri "http://localhost:8001/query" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"text":"I want a puppy"}'


2) Backend:
   cd backend
   mvn spring-boot:run

3) Frontend:
   cd frontend
   npm install
   npm run dev

Notes: frontend expects backend at http://localhost:8080 and backend expects FastAPI at http://localhost:8000

