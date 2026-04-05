import os

def main():
    print("--- [START] UPLOADING TO YOUTUBE ---")
    
    # 루트 폴더 경로 계산
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    video_file = os.path.join(base_dir, 'output.mp4')

    # 비디오 파일이 있는지 확인
    if os.path.exists(video_file):
        print(f"--- [SUCCESS] Found video: {video_file}")
        print("--- [INFO] Ready to send to YouTube API! ---")
    else:
        print(f"--- [ERROR] Video file not found at: {video_file}")

if __name__ == "__main__":
    main()
