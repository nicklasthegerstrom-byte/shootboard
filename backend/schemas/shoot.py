from pydantic import BaseModel


class ShootCreate(BaseModel):
    title: str
    description: str
    image_path: str
    location: str
    shoot_date: str
    status: str


class ShootResponse(ShootCreate):
    id: int

    class Config:
        from_attributes = True


class ShootUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    image_path: str | None = None
    location: str | None = None
    shoot_date: str | None = None
    status: str | None = None