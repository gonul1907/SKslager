#!/usr/bin/env python3
"""Simple image sharpening script using Pillow.

Usage: python scripts/sharpen_image.py

It reads images/hero.webp and writes images/hero_sharp.webp
"""
from PIL import Image, ImageFilter, Image
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
src = ROOT / 'images' / 'hero.webp'
dst = ROOT / 'images' / 'hero_sharp.webp'

if not src.exists():
    print(f"Source image not found: {src}")
    raise SystemExit(1)

print(f"Opening {src}")
img = Image.open(src).convert('RGB')

# Apply an unsharp mask for better clarity
print('Applying UnsharpMask...')
sharpened = img.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))

print(f"Saving sharpened image to {dst}")
# Save as webp with good quality
sharpened.save(dst, 'WEBP', quality=85, method=6)
print('Done')
