print("NEW VERSION RUNNING")

import os
import subprocess

# 1. 경로 설정: dirname을 두 번 써서 scripts 폴더 위인 '루트 폴더'로 이동합니다.
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 2. 파일 경로 정의
image_path = os.path.join(base_dir, "assets", "image.jpg")
music_path = os.path.join(base_dir, "assets", "music.mp3")
output_path = os.path.join(base_dir, "output.mp4")

# 3. 경로가 잘 잡혔는지 확인용 출력
print("Current working directory:", base_dir)
print("Image path:", image_path)
print("Music path:", music_path)

# 4. FFmpeg 명령어 실행
cmd = [
    'ffmpeg', 
    '-y',                 # 기존 파일이 있으면 덮어쓰기 옵션
    '-loop', '1', 
    '-i', image_path,     # 위에서 정의한 변수 사용
    '-i', music_path, 
    '-c:v', 'libx264', 
    '-tune', 'stillimage', 
    '-c:a', 'aac', 
    '-b:a', '192k', 
    '-pix_fmt', 'yuv420p', 
    '-shortest', 
    output_path
]

try:
    subprocess.run(cmd, check=True)
    print("비디오 제작 성공!")
except subprocess.CalledProcessError as e:
    print(f"비디오 제작 실패: {e}")
