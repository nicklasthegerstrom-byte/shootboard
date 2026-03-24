from typing import Annotated
from io import BytesIO
from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image

from config import UPLOAD_DIR, ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE
from images.collage import save_image, build_collage

router = APIRouter()


@router.post("/upload-collage")
async def make_collage(
    files: Annotated[list[UploadFile], File(...)]
):
     
    if len(files) != 4:
        raise HTTPException(status_code=400, detail="Upload exactly 4 images")
    
    images = []

    for file in files:
        if file.content_type not in ALLOWED_IMAGE_TYPES:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type: {file.filename}"
            )

        content = await file.read()

        if len(content) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail=f"File too large: {file.filename}"
            )

        try:
            image = Image.open(BytesIO(content))
        except Exception:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid image: {file.filename}"
            )
        
        images.append(image)
    
    try:
        collage = build_collage(images)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    try:
        filename = save_image(collage, UPLOAD_DIR)
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to save image")

    return {"message": f"Image saved as {filename}"}