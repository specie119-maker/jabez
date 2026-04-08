import os
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.http import MediaFileUpload
import json
from google.oauth2.credentials import Credentials

CLIENT_SECRETS_FILE = "client_secret.json"
SCOPES = ['https://www.googleapis.com/auth/youtube.upload']
API_SERVICE_NAME = 'youtube'
API_VERSION = 'v3'
TOKEN_FILE = "token.json"

def get_authenticated_service():
    credentials = None
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, 'r') as token:
            info = json.load(token)
            credentials = Credentials.from_authorized_user_info(info, SCOPES)
            
    if not credentials or not credentials.valid:
        if credentials and credentials.expired and credentials.refresh_token:
            from google.auth.transport.requests import Request
            credentials.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS_FILE, SCOPES)
            credentials = flow.run_local_server(port=0)
            
        with open(TOKEN_FILE, 'w') as token:
            token.write(credentials.to_json())
            
    return build(API_SERVICE_NAME, API_VERSION, credentials=credentials)

def initialize_upload(youtube, options):
    # 해시태그 파싱
    cleaned_tags = options['keywords'].replace('#', '')
    tags = [t.strip() for t in cleaned_tags.split(',')]

    body = {
        'snippet': {
            'title': options['title'],
            'description': options['description'],
            'tags': tags,
            'categoryId': options['category']
        },
        'status': {
            'privacyStatus': options['privacyStatus']
        }
    }

    print(f"▶ 쇼츠 업로드를 준비합니다: '{options['file']}'")
    insert_request = youtube.videos().insert(
        part=','.join(body.keys()),
        body=body,
        media_body=MediaFileUpload(options['file'], chunksize=-1, resumable=True)
    )
    
    response = None
    while response is None:
        status, response = insert_request.next_chunk()
        if status:
            print(f"쇼츠 업로드 진행률: {int(status.progress() * 100)}%")
            
    print(f"[성공] 쇼츠 업로드 완료! Video ID: https://youtube.com/shorts/{response['id']}")

def parse_shorts_metadata():
    # 쇼츠 전용 메타데이터 (고정 또는 동적 템플릿)
    title = "Peaceful African Choir Music 🌿 #Shorts"
    
    desc = """Relax with peaceful African choir music and gentle savanna atmosphere.
Soft choir voices and calm African rhythms create a deep healing experience.

---

평화로운 아프리카 합창단 음악과 부드러운 사바나의 분위기로 휴식을 취하세요.
부드러운 선율과 잔잔한 아프리카 리듬이 깊은 치유의 시간을 선사합니다.

#Shorts #AfricanJazz #AfricanChoir #healingmusic #Africanambient"""

    tags = "African jazz, African choir, healing music, African chill, Shorts, youtube shorts"

    return {
        "file": os.path.join("output", "final_test_videos", "user_real_shorts_v2.mp4"),
        "title": title[:100],
        "description": desc[:4900],
        "keywords": tags,
        "category": "10",
        "privacyStatus": "public" # 전체 공개
    }

if __name__ == '__main__':
    metadata = parse_shorts_metadata()
    if not os.path.exists(metadata['file']):
        print(f"❌ 에러: 쇼츠 영상 파일이 없습니다. 경로: {metadata['file']}")
    else:
        youtube = get_authenticated_service()
        try:
            initialize_upload(youtube, metadata)
        except HttpError as e:
            print(f"❌ 구글 API HTTP 오류 발생 {e.resp.status}:\n{e.content}")
