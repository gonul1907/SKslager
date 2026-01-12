#!/usr/bin/env python3
"""Deblur images using scikit-image algorithms.
Creates:
 - images/hero_deconv_rl.webp (Richardson-Lucy)
 - images/hero_deconv_wiener.webp (unsupervised Wiener)
 - images/hero_sharp2.webp (stronger unsharp mask)
"""
import numpy as np
from pathlib import Path
from PIL import Image, ImageFilter
from skimage import img_as_float, img_as_ubyte
from skimage.restoration import richardson_lucy, unsupervised_wiener
from skimage.filters import gaussian

ROOT = Path(__file__).resolve().parents[1]
src = ROOT / 'images' / 'hero.webp'
dst_rl = ROOT / 'images' / 'hero_deconv_rl.webp'
dst_w = ROOT / 'images' / 'hero_deconv_wiener.webp'
dst_sharp2 = ROOT / 'images' / 'hero_sharp2.webp'

if not src.exists():
    print('Source image not found:', src)
    raise SystemExit(1)

print('Loading', src)
img = Image.open(src).convert('RGB')
arr = np.array(img).astype(np.float32) / 255.0

# Work in luminance (Y) for deconvolution, keep color by converting to YCbCr
from skimage.color import rgb2ycbcr, ycbcr2rgb
img_ycbcr = rgb2ycbcr(arr)
y = img_ycbcr[..., 0] / 255.0

print('Estimating PSF (Gaussian)')
# PSF: small gaussian kernel
psf_size = 21
psf_sigma = 2.0
coords = np.arange(psf_size) - psf_size//2
xx, yy = np.meshgrid(coords, coords)
psf = np.exp(-(xx**2 + yy**2) / (2*psf_sigma**2))
psf /= psf.sum()

print('Running Richardson-Lucy (this may take a few seconds)')
# some skimage versions expect iterations as positional argument
rl = richardson_lucy(y, psf, 30, clip=False)

print('Running unsupervised Wiener')
try:
    wiener, _ = unsupervised_wiener(y, psf)
except Exception as e:
    print('Wiener failed:', e)
    wiener = y

# Merge deconvolved luminance back into color image
def merge_and_save(lum, outpath):
    ycb = img_ycbcr.copy()
    ycb[..., 0] = np.clip(lum * 255.0, 0, 255)
    rgb = ycbcr2rgb(ycb)
    out = Image.fromarray(img_as_ubyte(np.clip(rgb, 0, 1)))
    out.save(outpath, 'WEBP', quality=90, method=6)

merge_and_save(rl, dst_rl)
print('Saved', dst_rl)
merge_and_save(wiener, dst_w)
print('Saved', dst_w)

# Stronger unsharp as fallback
pil_sharp = img.filter(ImageFilter.UnsharpMask(radius=2, percent=200, threshold=1))
pil_sharp.save(dst_sharp2, 'WEBP', quality=90, method=6)
print('Saved', dst_sharp2)

print('Done')
