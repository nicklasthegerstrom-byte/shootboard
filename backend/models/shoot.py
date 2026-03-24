from sqlalchemy import Column, Integer, String
from database import Base


class Shoot(Base):
    __tablename__ = "shoots"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    image_path = Column(String, nullable=False)
    location = Column(String, nullable=False)
    shoot_date = Column(String, nullable=False)
    status = Column(String, nullable=False)


    