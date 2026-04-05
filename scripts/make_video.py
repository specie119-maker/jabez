import os
import subprocess

print("NEW VERSION RUNNING")

# 1. 경로 설정: scripts 폴더의 상위인 '루트 폴더'를 기준으로 잡습니다.
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 2. 파일들의 절대 경로를 변수에 담습니다. (따옴표 주의!)
image_path = os.path.join(base_dir, 'assets', 'image.jpg')
music_path = os.path.join(base_dir, 'assets', 'music.mp3')
output_path = os.path.join(base_dir, 'output.mp4')

# 3. 경로가 잘 잡혔는지 로그에 출력해봅니다.
print(f"Image path: {image_path}")
print(f"Music path: {music_path}")

# 4. FFmpeg 명령어 설정 (변수 이름을 따옴표 없이 넣어야 합니다!)
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
    output_path          # 변수 사용
]

# 5. 실행
try:
    subprocess.run(cmd, check=True)
    print("비디오 제작 완료!")
except subprocess.CalledProcessError as e:
    print(f"오류 발생: {e}")
