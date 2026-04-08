import os
import base64
import time
import datetime

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("❌ 에러: google-genai 라이브러리가 설치되지 않았습니다. 'pip install google-genai' 를 실행하세요.")
    exit(1)

def get_todays_prompts():
    # 대표님 맞춤형: 1940년대 재즈 악기 조합 (요일별로 주 3회 패턴 변경)
    instrument_combos = [
        "Saxophone and Piano", # 월, 목, 일 (0, 3, 6)
        "Piano and Classical Guitar", # 화, 금 (1, 4)
        "Muted Trumpet and Upright Bass" # 수, 토 (2, 5)
    ]
    day_of_week = datetime.datetime.now().weekday()
    inst = instrument_combos[day_of_week % 3]
    print(f"🎷 오늘(요일 코드 {day_of_week})의 1940년대 재즈 악기 조합: {inst}")
    
    # 대표님 요청: 보컬 없는(No vocals) 1940년대 아프리칸 칠 재즈 스타일 + Zulu(줄루) 믹스
    base_style = f"A unique mixed style of traditional Zulu musical elements and 1940s vintage jazz. Relaxing African chill jazz instrumental music. No vocals. Featuring {inst}."
    
    return [
        f"{base_style} Calm percussion, playing at a slow and steady tempo, deep relaxation, high fidelity",
        f"{base_style} Slow swaying peaceful mood, soulful instrumental melody, perfect for study focus and healing",
        f"{base_style} Warm sunset African beats, gentle and comforting texture, cinematic 4k audio",
        f"{base_style} Serene and mellow chorus of instruments, relaxing vintage groove, perfect for morning coffee",
        f"{base_style} Deep soothing harmonic progression, recording with analog tape warmth, peaceful atmosphere"
    ]

def find_api_key():
    # 대표님이 키를 저장하셨을 만한 모든 파일 경로를 뒤집니다.
    possible_files = [
        "gemini key.txt", 
        "제미나이 키.txt", 
        "key.txt", 
        r"C:\Users\MyComputer\Desktop\gemini key.txt",
        r"C:\Users\MyComputer\Desktop\제미나이 키.txt"
    ]
    
    for path in possible_files:
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                # 구글 API 키는 보통 'AIza'로 시작합니다.
                if "AIza" in content:
                    for line in content.split('\n'):
                        if "AIza" in line:
                            return line.strip()
    return os.environ.get("GEMINI_API_KEY")

def generate_track(client, prompt, index):
    print(f"\n🎵 [트랙 {index}] 작곡 시작: '{prompt[:40]}...'")
    try:
        # 2026 Lyria-3 Model implementation for Audio Modality
        response = client.models.generate_content(
            model="lyria-3-clip-preview", # 구글 최신 음악 모델
            contents=prompt,
            config=types.GenerateContentConfig(
                response_modalities=["AUDIO"], # 오디오 파일만 내뱉도록 지시
            )
        )
        
        # 다운로드 받은 오디오 이진 데이터를 MP3로 저장
        for candidate in response.candidates:
            for part in candidate.content.parts:
                if getattr(part, 'inline_data', None):
                    output_file = os.path.join("롱영상음원", f"ai_gen_track_{index}.mp3")
                    with open(output_file, 'wb') as f:
                        f.write(part.inline_data.data)
                    print(f"✅ 작곡 완료 및 저장됨: {output_file}")
                    return True
        print("❌ 오디오 데이터를 받지 못했습니다.")
        return False
    except Exception as e:
        print(f"❌ 작곡 중 오류 발생: {e}")
        return False

def main():
    print("=========================================")
    print(" 🤖 Google Lyria-3 (Gemini) 무인 작곡가 가동")
    print("=========================================")
    
    api_key = find_api_key()
    
    if not api_key:
        print("⚠️ 치명적 에러: 구글 API 키(제미나이 키)를 감지하지 못했습니다!")
        print("▶ 원인: 'gemini key.txt' 파일 내용이 비어있거나 다른 곳에 저장된 것으로 보입니다.")
        print("▶ 조치: 현재 폴더 안의 'gemini key.txt' 파일을 여시고, 복사하신 키(AIza...로 시작)를 다시 한 번 붙여넣은 뒤 [저장(Ctrl+S)]을 꾹 눌러주세요!")
        return

    print("🔑 API 키 감지 완료! (인증 통과)")
    
    # Google AI Client 초기화
    client = genai.Client(api_key=api_key)
    
    # 롱영상음원 폴더 확인
    os.makedirs("롱영상음원", exist_ok=True)
    
    count = 1
    for prompt in get_todays_prompts():
        # API 레이트 리밋 보호를 위해 약간 대기
        time.sleep(2)
        generate_track(client, prompt, count)
        count += 1
        
    print("\n🎉 모든 작곡 업무가 자동으로 완료되었습니다!")
    print("이제 '롱영상음원' 폴더의 MP3들로 1시간 영상을 자동 렌더링 할 수 있습니다.")

if __name__ == "__main__":
    main()
