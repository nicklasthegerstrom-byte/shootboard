from fastapi import APIRouter, HTTPException
from database import SessionLocal
from models.shoot import Shoot
from schemas.shoot import ShootCreate, ShootResponse, ShootUpdate

router = APIRouter()


@router.post("/shoots", response_model=ShootResponse, status_code=201)
def create_shoot(shoot: ShootCreate):
    db = SessionLocal()

    new_shoot = Shoot(
        title=shoot.title,
        description=shoot.description,
        image_path=shoot.image_path,
        location=shoot.location,
        shoot_date=shoot.shoot_date,
        status=shoot.status,
    )

    db.add(new_shoot)
    db.commit()
    db.refresh(new_shoot)
    db.close()

    return new_shoot

@router.get("/shoots", response_model=list[ShootResponse])
def get_shoots(title: str | None = None):
    db = SessionLocal()

    query = db.query(Shoot)

    if title:
        query = query.filter(Shoot.title.contains(title))

    shoots = query.all()

    db.close()
    return shoots

@router.get("/shoots/{id}", response_model=ShootResponse)
def get_shoot_by_id(id: int):
    db = SessionLocal()

    shoot = db.query(Shoot).filter(Shoot.id == id).first()

    if shoot is None:
        raise HTTPException(status_code=404, detail="Shoot not found")
    db.close()

    return shoot

@router.put("/shoots/{id}", response_model=ShootResponse)
def replace_shoot(id: int, new_shoot: ShootCreate):
    db = SessionLocal()
    db_shoot = db.query(Shoot).filter(Shoot.id == id).first()

    if db_shoot is None:
        raise HTTPException(status_code=404, detail="Shoot not found")
    
    db_shoot.title = new_shoot.title
    db_shoot.description = new_shoot.description
    db_shoot.image_path = new_shoot.image_path
    db_shoot.location = new_shoot.location
    db_shoot.shoot_date = new_shoot.shoot_date
    db_shoot.status = new_shoot.status

    db.commit()
    db.refresh(db_shoot)
    db.close()

    
    
    return db_shoot

@router.patch("/shoots/{id}", response_model=ShootResponse)
def update_shoot(id: int, shoot: ShootUpdate):
    db = SessionLocal()

    db_shoot = db.query(Shoot).filter(Shoot.id == id).first()

    if db_shoot is None:
        db.close()
        raise HTTPException(status_code=404, detail="Shoot not found")

    if shoot.title is not None:
        db_shoot.title = shoot.title

    if shoot.description is not None:
        db_shoot.description = shoot.description

    if shoot.image_path is not None:
        db_shoot.image_path = shoot.image_path

    if shoot.location is not None:
        db_shoot.location = shoot.location

    if shoot.shoot_date is not None:
        db_shoot.shoot_date = shoot.shoot_date

    if shoot.status is not None:
        db_shoot.status = shoot.status

    db.commit()
    db.refresh(db_shoot)
    db.close()

    return db_shoot

@router.delete("/shoots/{id}")
def delete_shoot(id: int):
    db = SessionLocal()

    shoot = db.query(Shoot).filter(Shoot.id == id).first()

    if shoot is None:
        db.close()
        raise HTTPException(status_code=404, detail="Shoot not found")

    db.delete(shoot)
    db.commit()
    db.close()

    return {"message": f"Shoot {id} deleted"}
