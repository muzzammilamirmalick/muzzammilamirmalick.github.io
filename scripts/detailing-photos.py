# Turns the original detailing photos in photos/detailing/ into small WebP files
# in public/detailing/, which is what the site uses. The JPGs never reach the build.
# Run it after adding or changing a photo:  python scripts/detailing-photos.py
# Needs Pillow:  pip install pillow
from pathlib import Path
from PIL import Image, ImageOps

SOURCE = Path("photos/detailing")
OUTPUT = Path("public/detailing")

OUTPUT.mkdir(parents=True, exist_ok=True)
for photo in sorted(SOURCE.glob("*.jpg")):
    image = ImageOps.exif_transpose(Image.open(photo)).convert("RGB")
    # Roughly twice the size the slider shows, so photos stay sharp on phones.
    # Crop to 3:4 for tall photos and 4:3 for wide ones, so both photos in a pair line up.
    size = (720, 960) if image.height > image.width else (960, 720)
    image = ImageOps.fit(image, size, Image.LANCZOS)
    target = OUTPUT / (photo.stem + ".webp")
    image.save(target, "WEBP", quality=72, method=6)
    print(f"{target}  {target.stat().st_size // 1024} KB")
