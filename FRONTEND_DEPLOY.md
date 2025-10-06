# ⚡ 프론트엔드 빠른 배포 가이드

## 🎯 개요
이 문서는 COZY 프론트엔드를 Render.com에 배포하는 **빠른 가이드**입니다.
상세한 내용은 `ui/DEPLOYMENT_GUIDE.md`를 참조하세요.

---

## ✅ 사전 준비

1. **백엔드 API 배포 완료** (필수!)
   - Render에서 백엔드 서버가 실행 중이어야 합니다
   - 백엔드 URL을 메모하세요: `https://your-backend.onrender.com`

2. **GitHub 저장소 푸시** (필수!)
   ```bash
   git add .
   git commit -m "feat: 프론트엔드 배포 준비"
   git push origin main
   ```

3. **로컬 빌드 테스트** (권장)
   ```bash
   cd ui
   npm run build
   # 성공하면 dist 폴더가 생성됩니다
   ```

---

## 🚀 배포 단계 (5분 소요)

### 1️⃣ Render 접속 및 Static Site 생성
- [Render.com](https://render.com) 로그인
- **New +** → **Static Site** 클릭

### 2️⃣ GitHub 저장소 연결
- 본인의 저장소 선택
- **Connect** 클릭

### 3️⃣ 설정 입력

복사해서 붙여넣으세요:

```
Name: cozy-order-app
Branch: main
Root Directory: ui
Build Command: npm install && npm run build
Publish Directory: dist
```

### 4️⃣ 환경변수 설정 (중요!)

**Environment Variables 섹션:**

```
VITE_API_URL=https://your-backend.onrender.com
```

⚠️ **백엔드 URL을 정확히 입력하세요!**

### 5️⃣ 배포 시작
- **Create Static Site** 클릭
- 3-5분 대기

---

## 🔧 배포 완료 후 작업

### 백엔드 CORS 설정

백엔드 서비스의 환경변수에 추가:

```
FRONTEND_URL=https://cozy-order-app.onrender.com
```

*(본인의 프론트엔드 URL로 변경)*

---

## ✅ 테스트

배포된 URL 접속: `https://cozy-order-app.onrender.com`

### 체크리스트
- [ ] 메뉴가 표시되는가?
- [ ] 이미지가 로드되는가?
- [ ] 주문이 작동하는가?
- [ ] 관리자 페이지가 작동하는가?

---

## 🐛 문제 해결

| 문제 | 해결 방법 |
|------|----------|
| 메뉴가 안 보임 | `VITE_API_URL` 확인 |
| CORS 에러 | 백엔드 `FRONTEND_URL` 확인 |
| 이미지 안 보임 | 백엔드에 이미지 파일 있는지 확인 |
| 빌드 실패 | 로컬에서 `npm run build` 테스트 |

자세한 트러블슈팅: `ui/DEPLOYMENT_GUIDE.md` 참조

---

## 📝 배포 설정 요약

```yaml
# Render Static Site Settings
Name: cozy-order-app
Branch: main
Root Directory: ui
Build Command: npm install && npm run build
Publish Directory: dist

# Environment Variables
VITE_API_URL: <백엔드 URL>
```

---

## 🎉 완료!

배포가 완료되면 전 세계 어디서나 접속 가능합니다!

**다음 단계**: 
- 커스텀 도메인 연결 (선택)
- 성능 모니터링
- 사용자 피드백 수집

