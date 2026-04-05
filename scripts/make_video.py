import os
import subprocess

print("--- [CHECK] STARTING VIDEO GENERATION ---")

# 현재 파일 위치 확인
current_file = os.path.abspath(__file__)
base_dir = os.path.dirname(os.path.dirname(current_file))

# 절대 경로 생성
img = os.path.join(base_dir, 'assets', 'image.jpg')
aud = os.path.join(base_dir, 'assets', 'music.mp3')
out = os.path.join(base_dir, 'output.mp4')

# [중요] 경로가 제대로 만들어졌는지 로그에 출력
print(f"--- [CHECK] IMAGE PATH: {img}")
print(f"--- [CHECK] MUSIC PATH: {aud}")

# FFmpeg 실행 (따옴표 없이 변수 이름만!)
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
    print("--- [SUCCESS] VIDEO CREATED ---")
except Exception as e:
    print(f"--- [ERROR] FAILED: {e}")
    raise e
