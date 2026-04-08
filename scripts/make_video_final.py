import os
import subprocess
import argparse

# Pillow 라이브러리로 텍스트를 이미지에 먼저 합성 (안정적)
try:
    from PIL import Image, ImageDraw, ImageFont
    HAS_PILLOW = True
except ImportError:
    HAS_PILLOW = False

parser = argparse.ArgumentParser()
parser.add_argument('--type', choices=['long_1h', 'long_2h', 'short'], default='long_1h')
args = parser.parse_args()

print(f"--- [NEW] STARTING VIDEO GENERATION ({args.type.upper()}) ---")

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
img = os.path.join(base_dir, 'assets', 'image.jpg')
aud = os.path.join(base_dir, 'assets', 'music.mp3')
out = os.path.join(base_dir, 'output.mp4')

print(f"--- [DEBUG] Target Image: {img}")
print(f"--- [DEBUG] Target Music: {aud}")

import random

# 텍스트가 합성된 임시 이미지 경로
temp_img = os.path.join(base_dir, 'assets', 'temp_image_text.jpg')

if HAS_PILLOW:
    print("--- [INFO] Pillow를 사용하여 이미지에 텍스트를 합성합니다 ---")
    try:
        image = Image.open(img)
        draw = ImageDraw.Draw(image)
        
        # Windows 로컬에서 사용할 4~5가지 가독성 좋은 폰트 리스트
        font_options = [
            "C:/Windows/Fonts/arialbd.ttf",   # Arial Bold
            "C:/Windows/Fonts/malgunbd.ttf",  # 맑은 고딕 Bold
            "C:/Windows/Fonts/impact.ttf",    # Impact
            "C:/Windows/Fonts/tahoma.ttf",    # Tahoma
            "C:/Windows/Fonts/trebucbd.ttf"   # Trebuchet MS Bold
        ]
        
        # 무작위로 폰트 하나 선택
        selected_font_path = random.choice(font_options)
        print(f"--- [INFO] 선택된 폰트: {selected_font_path} ---")
        
        try:
            # 해상도에 맞게 폰트 크기 조정
            font_size = int(image.height * 0.08)
            font = ImageFont.truetype(selected_font_path, font_size)
        except Exception as e:
            print(f"--- [WARNING] 폰트 로드 실패 ({selected_font_path}), 기본 폰트 사용: {e}")
            font = ImageFont.load_default()
            
        text = "AFRICAN CHILL JAZZ"
        
        try:
            bbox = draw.textbbox((0, 0), text, font=font)
            text_w = bbox[2] - bbox[0]
            text_h = bbox[3] - bbox[1]
        except AttributeError:
            text_w, text_h = draw.textsize(text, font=font)
            
        x = (image.width - text_w) / 2
        y = (image.height - text_h) / 2
        
        # [가독성 강화] 두꺼운 검은색 그림자 (외곽선 느낌)
        shadow_offset = 6
        draw.text((x + shadow_offset, y + shadow_offset), text, font=font, fill=(0,0,0))
        draw.text((x - 2, y - 2), text, font=font, fill=(0,0,0))
        draw.text((x + 2, y - 2), text, font=font, fill=(0,0,0))
        
        # 본 텍스트 (완전한 흰색)
        draw.text((x, y), text, font=font, fill=(255,255,255))
        
        image.save(temp_img)
        img_to_use = temp_img
    except Exception as e:
        print(f"--- [WARNING] 텍스트 합성 실패 (무시하고 원본 사용): {e}")
        img_to_use = img
else:
    print("--- [WARNING] Pillow 라이브러리가 없어 텍스트를 합성하지 않습니다 ---")
    img_to_use = img

# FFmpeg 명령어 구성
cmd = [
    'ffmpeg', '-y', '-loop', '1', 
    '-i', img_to_use, 
    '-stream_loop', '-1', '-i', aud, 
    '-c:v', 'libx264', '-tune', 'stillimage', 
    '-c:a', 'aac', '-b:a', '192k', 
    '-pix_fmt', 'yuv420p'
]

if args.type == 'short':
    # 쇼츠용 세로 크롭 및 30초 고정 (수정됨)
    cmd.extend(['-vf', 'crop=ih*(9/16):ih', '-t', '30'])
elif args.type == 'long_2h':
    # 롱폼 2시간 고정 (7200초)
    cmd.extend(['-t', '7200'])
else:
    # 롱폼 1시간 고정 (3600초)
    cmd.extend(['-t', '3600'])

cmd.append(out)

try:
    print(f"--- [INFO] FFmpeg 실행 중... ---")
    subprocess.run(cmd, check=True)
    print("--- [SUCCESS] VIDEO CREATED! ---")
    
    # 임시 이미지 정리
    if os.path.exists(temp_img):
        os.remove(temp_img)
except Exception as e:
    print(f"--- [ERROR] FAILED: {e}")
    raise e
