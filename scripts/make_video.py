import os
import subprocess
import sys

print("--- [FORCED CHECK] STARTING VIDEO GENERATION ---")

# 현재 실행 경로와 파일 위치를 로그로 찍어서 확인
current_working_dir = os.getcwd()
script_location = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.dirname(script_location)

print(f"--- [DEBUG] Working Dir: {current_working_dir}")
print(f"--- [DEBUG] Script Location: {script_location}")
print(f"--- [DEBUG] Root Dir: {root_dir}")

# 서버 환경에서 절대 경로를 강제로 지정
image_path = os.path.join(root_dir, 'assets', 'image.jpg')
music_path = os.path.join(root_dir, 'assets', 'music.mp3')
output_path = os.path.join(root_dir, 'output.mp4')

# 파일이 진짜 존재하는지 체크
if not os.path.exists(image_path):
    print(f"--- [CRITICAL ERROR] IMAGE NOT FOUND AT: {image_path}")
    # 폴더 안의 파일 목록을 출력해서 진짜 위치를 찾음
    if os.path.exists(os.path.join(root_dir, 'assets')):
        print(f"Files in assets: {os.listdir(os.path.join(root_dir, 'assets'))}")
    sys.exit(1)

print(f"--- [FORCED CHECK] IMAGE PATH: {image_path}")
print(f"--- [FORCED CHECK] MUSIC PATH: {music_path}")

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
    print("--- [EXECUTING FFMPEG] ---")
    subprocess.run(cmd, check=True)
    print("--- [SUCCESS] VIDEO CREATED SUCCESSFULLY! ---")
except Exception as e:
    print(f"--- [ERROR] FFmpeg failed: {e}")
    sys.exit(1)
