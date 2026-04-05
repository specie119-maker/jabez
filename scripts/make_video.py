print("NEW VERSION RUNNING")

import os
import subprocess

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

image = os.path.join(base_dir, "assets", "image.jpg")
audio = os.path.join(base_dir, "assets", "music.mp3")
output = os.path.join(base_dir, "output.mp4")

print("Current working directory:", base_dir)
print("Image path:", image)
print("Audio path:", audio)
print("Output path:", output)
print("Image exists:", os.path.exists(image))
print("Audio exists:", os.path.exists(audio))

assets_dir = os.path.join(base_dir, "assets")
if os.path.isdir(assets_dir):
    print("Assets folder contents:", os.listdir(assets_dir))
else:
    print("Assets folder not found")

cmd = [
    "ffmpeg",
    "-loop", "1",
    "-i", image,
    "-i", audio,
    "-c:v", "libx264",
    "-tune", "stillimage",
    "-c:a", "aac",
    "-b:a", "192k",
    "-pix_fmt", "yuv420p",
    "-shortest",
    output
]

result = subprocess.run(cmd, text=True, capture_output=True)
print(result.stdout)
print(result.stderr)
result.check_returncode()
