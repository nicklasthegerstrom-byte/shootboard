from uuid import uuid4
from PIL import Image, ImageOps


def build_collage(images: list[Image.Image]) -> Image.Image:

    if len(images) != 4:
        raise ValueError("Exactly 4 images are required")
    
    if not all(isinstance(img, Image.Image) for img in images):
        raise ValueError("All items must be valid PIL images")

    # 🔧 sätt storlek per bild
    size = (500, 500)

    resized = [ImageOps.fit(img, size) for img in images]

    # 🔧 skapa canvas (2x2)
    width = size[0] * 2
    height = size[1] * 2

    collage = Image.new("RGB", (width, height))

    # 🔧 placera bilder
    collage.paste(resized[0], (0, 0))           # top-left
    collage.paste(resized[1], (size[0], 0))     # top-right
    collage.paste(resized[2], (0, size[1]))     # bottom-left
    collage.paste(resized[3], (size[0], size[1]))  # bottom-right

    return collage

def save_image(image, upload_dir: Path) -> str:
    filename = f"{uuid4()}.jpg"
    path = upload_dir / filename

    image = image.convert("RGB")
    image.save(path, format="JPEG", quality=90)

    return filename