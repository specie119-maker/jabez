import os
import subprocess

# 이 문구가 로그에 안 찍히면 코드가 안 바뀐 겁니다!
print("--- [FORCED CHECK] STARTING VIDEO GENERATION ---")

# 현재 파일 위치를 기준으로 절대 경로 계산
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 파일 경로 (서버 환경에 맞게 강제 지정)
image_path = os.path.join(base_dir, 'assets', 'image.jpg')
music_path = os.path.join(base_dir, 'assets', 'music.mp3')
output_path = os.path.join(base_dir, 'output.mp4')

print(f"--- [DEBUG] Image Path: {image_path}")
print(f"--- [DEBUG] Music Path: {music_path}")

# FFmpeg 명령어 (변수 이름을 따옴표 없이 넣으세요!)
cmd = [
    'ffmpeg', '-y', '-loop', '1', 
    '-i', image_path, 
    '-i', music_path, 
    '-c:v', 'libx264', '-tune', 'stillimage', 
    '-c:a', 'aac', '-b:a', '192k', 
    '-pix_fmt', 'yuv420p', '-shortest', 
    output_path
]

try:
    subprocess.run(cmd, check=True)
    print("--- [SUCCESS] VIDEO CREATED! ---")
except Exception as e:
    print(f"--- [ERROR] FAILED: {e}")
    raise e
