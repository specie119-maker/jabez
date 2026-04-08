@echo off
chcp 65001 > nul
cd /d "C:\Users\MyComputer\OneDrive\D\youtube 음악채널자동화" || cd /d "D:\youtube 음악채널자동화"

echo ===================================================
echo 🤖 유튜브 완전 자동화 로봇 (솔로몬) 가동을 시작합니다
echo ===================================================

echo.
echo [0.5단계] 기존 음원 삭제 여부 확인... (새로운 곡을 위해)
del /Q "롱영상음원\*.mp3" 2>nul
echo [1단계] 구글 Lyria AI로 새로운 음악 작곡 중...
python generate_music_lyria.py
if %errorlevel% neq 0 (
    echo [에러] 음악 생성 중 오류가 발생했습니다. 구글 API 상태를 확인하세요.
    exit /b %errorlevel%
)

echo.
echo [2단계] 1시간 롱영상 렌더링 중... (약 15~20분 소요)
node build_real_1hour.js
if %errorlevel% neq 0 (
    echo [에러] 영상 렌더링 중 오류가 발생했습니다.
    exit /b %errorlevel%
)

echo.
echo [3단계] 타임라인(챕터) 자동 추출 구조화 중...
node generate_timeline2.js

echo.
echo [4단계] 유튜브 스튜디오 자동 업로드 진행 중...
python upload_youtube.py

echo.
echo ===================================================
echo 🎉 모든 자동화 작업이 성공적으로 완료되었습니다!
echo ===================================================
exit
