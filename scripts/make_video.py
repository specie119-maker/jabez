import os
import subprocess

base_dir = os.getcwd()

image = os.path.join(base_dir, "assets/image.jpg")
audio = os.path.join(base_dir, "assets/music.mp3")
output = os.path.join(base_dir, "output.mp4")

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

subprocess.run(cmd, check=True)

print("Video Created")
