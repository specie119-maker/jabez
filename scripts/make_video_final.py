import os
import subprocess

print("--- [NEW] STARTING VIDEO GENERATION ---")

# 현재 파일 위치를 기준으로 루트 폴더 절대 경로 계산
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 파일 절대 경로 완성 (강제 지정)
img = os.path.join(base_dir, 'assets', 'image.jpg')
aud = os.path.join(base_dir, 'assets', 'music.mp3')
out = os.path.join(base_dir, 'output.mp4')

print(f"--- [DEBUG] Target Image: {img}")
print(f"--- [DEBUG] Target Music: {aud}")

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
