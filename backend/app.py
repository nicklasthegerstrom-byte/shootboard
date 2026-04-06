from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from database import Base, engine
from models.shoot import Shoot
from routes.shoot_routes import router as shoot_router
from routes.upload_routes import router as upload_router
from config import UPLOAD_DIR

app = FastAPI(title="ShootBoard API")

Base.metadata.create_all(bind=engine)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://shootboard-five.vercel.app",
        "https://shootboard.nicklasthegerstrom.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(shoot_router)
app.include_router(upload_router)

@app.get("/")
def root():
    return {"message": "ShootBoard API is running 🚀"}