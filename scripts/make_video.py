import os
import subprocess

print("--- STARTING VIDEO GENERATION ---")

# 현재 스크립트 파일의 위치: /home/runner/work/jabez/jabez/scripts/make_video.py
# 루트 폴더 위치를 절대 경로로 잡기
current_script_path = os.path.abspath(__file__)
scripts_dir = os.path.dirname(current_script_path)
root_dir = os.path.dirname(scripts_dir)

# 파일 경로를 절대 경로로 완성
image_path = os.path.join(root_dir, 'assets', 'image.jpg')
music_path = os.path.join(root_dir, 'assets', 'music.mp3')
output_path = os.path.join(root_dir, 'output.mp4')

print(f"Working Directory: {os.getcwd()}")
print(f"Looking for image at: {image_path}")
print(f"Looking for music at: {music_path}")

# FFmpeg 명령어 (변수 이름을 따옴표 없이 넣는 것이 핵심!)
cmd = [
    'ffmpeg', 
    '-y', 
    '-loop', '1', 
    '-i', image_path,    # 변수 사용
    '-i', music_path,    # 변수 사용
    '-c:v', 'libx264', 
    '-tune', 'stillimage', 
    '-c:a', 'aac', 
    '-b:a', '192k', 
    '-pix_fmt', 'yuv420p', 
    '-shortest', 
    output_path
]

try:
    result = subprocess.run(cmd, check=True, capture_output=True, text=True)
    print("SUCCESS: Video created at", output_path)
except subprocess.CalledProcessError as e:
    print("FFmpeg Error Output:", e.stderr)
    raise e
