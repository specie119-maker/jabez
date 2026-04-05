import os
import subprocess

image = "assets/image.jpg"
audio = "assets/music.mp3"
output = "output.mp4"

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

subprocess.run(cmd)

print("Video Created")
