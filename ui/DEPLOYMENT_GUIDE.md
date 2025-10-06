# 🚀 프론트엔드 Render 배포 가이드

## ✅ 배포 전 체크리스트

- [ ] 백엔드 API가 Render에 배포되어 있어야 합니다
- [ ] 백엔드 API URL을 알고 있어야 합니다
- [ ] GitHub 저장소에 코드가 푸시되어 있어야 합니다

---

## 📝 1단계: 코드 수정 필요 사항

### ✅ 이미 완료된 설정

현재 프론트엔드 코드는 배포 준비가 완료되어 있습니다:

1. **환경변수 지원** ✓
   - `ui/src/config/api.js`에서 `VITE_API_URL` 환경변수 사용
   - 기본값: `http://localhost:5001` (로컬 개발)

2. **빌드 스크립트** ✓
   - `npm run build` 명령으로 프로덕션 빌드 가능
   - 빌드 결과물: `dist` 폴더

3. **이미지 경로** ✓
   - 백엔드 서버에서 이미지를 제공받도록 설정됨
   - `API_BASE_URL + imageUrl` 형태로 동적 경로 사용

### 🔍 코드 검증

```bash
# 로컬에서 프로덕션 빌드 테스트
cd ui
npm run build

# 빌드 결과물 미리보기
npm run preview
```

---

## 🌐 2단계: Render Static Site 생성

### 1. Render 대시보드 접속
- [https://render.com](https://render.com) 로그인
- **New +** 버튼 클릭 → **Static Site** 선택

### 2. GitHub 저장소 연결
- **Connect a repository** 클릭
- GitHub 계정 연결 (처음이라면)
- 저장소 선택: `order-app` (또는 본인의 저장소 이름)
- **Connect** 클릭

### 3. 기본 설정 입력

| 설정 항목 | 값 |
|---------|---|
| **Name** | `cozy-order-app` (원하는 이름) |
| **Branch** | `main` |
| **Root Directory** | `ui` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |
| **Auto-Deploy** | `Yes` (체크) |

### 4. 환경변수 설정 (중요!)

**Environment Variables** 섹션에서 다음을 추가:

```
Key: VITE_API_URL
Value: https://your-backend-app.onrender.com
```

⚠️ **주의사항:**
- 백엔드 API의 **실제 Render URL**을 입력하세요
- URL 끝에 `/`를 붙이지 마세요
- 예시: `https://cozy-order-api.onrender.com`

### 5. 배포 시작
- **Create Static Site** 버튼 클릭
- 자동으로 빌드 및 배포가 시작됩니다

---

## ⏱️ 3단계: 배포 프로세스 모니터링

### 빌드 로그 확인
배포가 시작되면 실시간 로그를 볼 수 있습니다:

```
==> Cloning from https://github.com/...
==> Checking out commit ...
==> Installing dependencies
npm install && npm run build
...
==> Build successful!
==> Deploying...
==> Your site is live at: https://cozy-order-app.onrender.com
```

### 예상 소요 시간
- 첫 배포: 약 3-5분
- 이후 재배포: 약 2-3분

---

## 🔄 4단계: 백엔드 CORS 설정 업데이트

프론트엔드 배포 후 백엔드에서 CORS를 설정해야 합니다.

### Render 백엔드 서비스 → Environment 탭

환경변수 추가/수정:
```
FRONTEND_URL=https://cozy-order-app.onrender.com
```

⚠️ **본인의 실제 프론트엔드 URL**로 변경하세요!

저장하면 백엔드가 자동으로 재시작됩니다.

---

## ✅ 5단계: 배포 확인 및 테스트

### 1. 프론트엔드 URL 접속
`https://cozy-order-app.onrender.com` (본인의 URL)

### 2. 기능 테스트

#### 주문하기 화면
- [ ] 메뉴가 정상적으로 표시되는가?
- [ ] 이미지가 제대로 로드되는가?
- [ ] 옵션 선택이 작동하는가?
- [ ] 장바구니에 담기가 작동하는가?
- [ ] 주문하기가 성공하는가?

#### 관리자 화면
- [ ] 대시보드 통계가 표시되는가?
- [ ] 재고 현황이 표시되는가?
- [ ] 주문 목록이 표시되는가?
- [ ] 재고 조정이 작동하는가?
- [ ] 주문 상태 변경이 작동하는가?

### 3. 브라우저 개발자 도구 확인
- `F12` 또는 `Cmd+Option+I` (Mac)
- **Console** 탭: 에러 메시지 확인
- **Network** 탭: API 요청/응답 확인

---

## 🐛 트러블슈팅

### 문제 1: 메뉴가 표시되지 않음
**원인**: 백엔드 API 연결 실패

**해결방법**:
1. 브라우저 Console에서 에러 확인
2. `VITE_API_URL` 환경변수가 올바른지 확인
3. 백엔드가 정상 작동 중인지 확인
   ```bash
   curl https://your-backend.onrender.com/api/health
   curl https://your-backend.onrender.com/api/menus
   ```

### 문제 2: CORS 에러
**원인**: 백엔드에서 프론트엔드 URL을 허용하지 않음

**해결방법**:
1. 백엔드 환경변수 `FRONTEND_URL` 확인
2. 프론트엔드 URL과 정확히 일치하는지 확인 (https, 도메인, 슬래시 등)
3. 백엔드 재시작 확인

### 문제 3: 이미지가 표시되지 않음
**원인**: 백엔드 이미지 경로 문제

**해결방법**:
1. 백엔드에 `server/public/images/` 폴더가 있는지 확인
2. 이미지 파일이 Git에 커밋되었는지 확인
3. 백엔드 API 직접 접근 테스트:
   ```
   https://your-backend.onrender.com/images/americano.jpg
   ```

### 문제 4: 빌드 실패
**원인**: 의존성 또는 빌드 설정 문제

**해결방법**:
1. 로컬에서 빌드 테스트: `npm run build`
2. `package.json`의 `build` 스크립트 확인
3. Node.js 버전 확인 (Render는 최신 LTS 사용)

---

## 🔄 6단계: 코드 업데이트 및 재배포

### 자동 재배포
코드를 수정하고 GitHub에 푸시하면 자동으로 재배포됩니다:

```bash
# 코드 수정 후
git add .
git commit -m "Update: 기능 개선"
git push origin main
```

Render가 자동으로 감지하고 재빌드/재배포합니다.

### 수동 재배포
Render Dashboard → 해당 Static Site → **Manual Deploy** 버튼

### 환경변수 변경 시
환경변수를 수정한 경우 수동으로 재배포가 필요합니다.

---

## 📊 배포 완료 체크리스트

- [ ] Render Static Site 생성 완료
- [ ] GitHub 저장소 연결 완료
- [ ] 빌드 설정 입력 완료
  - [ ] Root Directory: `ui`
  - [ ] Build Command: `npm install && npm run build`
  - [ ] Publish Directory: `dist`
- [ ] 환경변수 설정 완료
  - [ ] `VITE_API_URL` = 백엔드 URL
- [ ] 배포 성공 확인
- [ ] 백엔드 CORS 설정 완료
  - [ ] `FRONTEND_URL` = 프론트엔드 URL
- [ ] 기능 테스트 완료
  - [ ] 주문하기 기능
  - [ ] 관리자 기능

---

## 🎉 배포 완료!

축하합니다! 프론트엔드가 성공적으로 배포되었습니다.

**배포된 URL**: `https://cozy-order-app.onrender.com`

이제 누구나 인터넷을 통해 COZY 커피 주문 앱을 사용할 수 있습니다! ☕

---

## 💡 추가 팁

### Custom Domain 연결
Render에서 본인의 도메인을 연결할 수 있습니다:
1. Static Site → Settings → Custom Domain
2. 도메인 입력 및 DNS 설정

### HTTPS
Render는 기본적으로 **무료 SSL 인증서**를 제공합니다.

### 성능 모니터링
Render Dashboard에서 트래픽, 빌드 히스토리 등을 확인할 수 있습니다.

### Free Plan 제한사항
- **대역폭**: 월 100GB
- **빌드 시간**: 월 400분
- 충분히 개인 프로젝트나 데모용으로 사용 가능합니다!

