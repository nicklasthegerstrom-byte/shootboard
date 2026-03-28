from pydantic import BaseModel, Field


class ShootCreate(BaseModel):
    title: str = Field(min_length=1)
    description: str = Field(min_length=1)
    image_path: str = Field(min_length=1)
    location: str = Field(min_length=1)
    shoot_date: str = Field(min_length=1)


class ShootResponse(ShootCreate):
    id: int
    status: str

    class Config:
        from_attributes = True


class ShootUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    image_path: str | None = None
    location: str | None = None
    shoot_date: str | None = None
    status: str | None = None