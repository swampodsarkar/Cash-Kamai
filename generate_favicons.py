import os
from PIL import Image, ImageDraw, ImageFont
import math

OUT = r"D:\DAA\ptc-website"
SIZES = [16, 32, 48, 180, 192, 512]

PRIMARY = (247, 147, 26)
PRIMARY_DARK = (230, 126, 0)
BG_DARK = (10, 10, 26)
TEXT_COLOR = (255, 255, 255)


def create_favicon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    cx, cy = size // 2, size // 2
    r = size // 2 - size * 0.06

    gradient = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(gradient)
    max_i = min(size - 1, int(r * 2))
    for i in range(max_i + 1):
        t = i / max_i if max_i > 0 else 0
        rr = int(PRIMARY[0] * (1 - t) + PRIMARY_DARK[0] * t)
        gg = int(PRIMARY[1] * (1 - t) + PRIMARY_DARK[1] * t)
        bb = int(PRIMARY[2] * (1 - t) + PRIMARY_DARK[2] * t)
        shrink = i * 0.5
        gdraw.ellipse(
            [cx - r + shrink, cy - r + shrink, cx + r - shrink, cy + r - shrink],
            fill=(rr, gg, bb, 255),
        )

    mask = Image.new("L", (size, size), 0)
    mdraw = ImageDraw.Draw(mask)
    mdraw.ellipse(
        [cx - r, cy - r, cx + r, cy + r], fill=255
    )
    img.paste(gradient, (0, 0), mask)

    inner_r = r * 0.78
    mdraw2 = ImageDraw.Draw(mask)
    mdraw2.ellipse(
        [cx - inner_r, cy - inner_r, cx + inner_r, cy + inner_r], fill=0
    )
    img.paste(BG_DARK + (255,), (0, 0), mask)

    text = "CK"
    try:
        font_size = int(size * 0.38)
        font = ImageFont.truetype("arial.ttf", font_size)
    except Exception:
        try:
            font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", font_size)
        except Exception:
            font = ImageFont.load_default()

    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = cx - tw // 2
    ty = cy - th // 2 - size * 0.02

    draw.text((tx + 1, ty + 1), text, fill=(0, 0, 0, 180), font=font)
    draw.text((tx, ty), text, fill=TEXT_COLOR, font=font)

    return img


def main():
    os.makedirs(OUT, exist_ok=True)

    for s in SIZES:
        icon = create_favicon(s)
        path = os.path.join(OUT, f"favicon-{s}x{s}.png")
        icon.save(path, "PNG")
        print(f"Created {path}")

    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    ico_images = []
    for s in ico_sizes:
        icon = create_favicon(s[0])
        ico_images.append(icon)

    ico_path = os.path.join(OUT, "favicon.ico")
    ico_images[0].save(
        ico_path,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )
    print(f"Created {ico_path}")

    apple_path = os.path.join(OUT, "apple-touch-icon.png")
    apple = create_favicon(180)
    apple.save(apple_path, "PNG")
    print(f"Created {apple_path}")

    print("All favicons generated successfully!")


if __name__ == "__main__":
    main()