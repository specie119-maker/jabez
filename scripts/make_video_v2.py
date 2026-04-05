import os
import subprocess

print("--- [ULTIMATE CHECK] STARTING VIDEO GENERATION ---")

# 현재 파일 위치를 기준으로 절대 경로 계산
current_file = os.path.abspath(__file__)
base_dir = os.path.dirname(os.path.dirname(current_file))

# 파일 경로 (절대 경로)
img = os.path.join(base_dir, 'assets', 'image.jpg')
aud = os.path.join(base_dir, 'assets', 'music.mp3')
out = os.path.join(base_dir, 'output.mp4')

print(f"--- [ULTIMATE CHECK] IMAGE PATH: {img}")
print(f"--- [ULTIMATE CHECK] MUSIC PATH: {aud}")

# FFmpeg 명령어
cmd = [
    'ffmpeg', '-y', '-loop', '1', 
    '-i', img, 
    '-i', aud, 
    '-c:v', 'libx264', '-tune', 'stillimage', 
    '-c:a', 'aac', '-b:a', '192k', 
    '-pix_fmt', 'yuv420p', '-shortest', 
    out
]

try:
    subprocess.run(cmd, check=True)
    print("--- [SUCCESS] VIDEO CREATED! ---")
except Exception as e:
    print(f"--- [ERROR] FAILED: {e}")
    raise e
