import os
import subprocess

print("--- STARTING VIDEO GENERATION ---")

# 현재 파일 위치를 기준으로 절대 경로 계산
current_script_path = os.path.abspath(__file__)
scripts_dir = os.path.dirname(current_script_path)
root_dir = os.path.dirname(scripts_dir)

# 절대 경로 변수 설정
image_path = os.path.join(root_dir, 'assets', 'image.jpg')
music_path = os.path.join(root_dir, 'assets', 'music.mp3')
output_path = os.path.join(root_dir, 'output.mp4')

print(f"Image path: {image_path}")
print(f"Music path: {music_path}")

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
    print("SUCCESS: Video created!")
except subprocess.CalledProcessError as e:
    print(f"Error: {e}")
    raise e
