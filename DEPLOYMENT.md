# 🚀 COZY 커피 주문 앱 배포 가이드 (Render.com)

## 📋 배포 순서

### 1단계: GitHub 저장소 생성 및 푸시

```bash
# Git 초기화 (아직 안했다면)
git init
git add .
git commit -m "Initial commit: COZY coffee order app"

# GitHub 저장소 생성 후
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

---

### 2단계: PostgreSQL 데이터베이스 배포 (Render)

1. **Render.com 로그인** → Dashboard

2. **New PostgreSQL 생성**
   - Name: `order-app-db` (또는 원하는 이름)
   - Database: `order_app_db_qzww` (자동 생성됨)
   - User: `order_app_db_qzww_user` (자동 생성됨)
   - Region: `Oregon (US West)`
   - Plan: `Free` 선택

3. **데이터베이스 생성 후 연결 정보 확인**
   - Internal Database URL
   - External Database URL
   - Host, Port, Database, Username, Password

4. **로컬에서 데이터베이스 초기화**
   ```bash
   # server/.env 파일 수정 (이미 완료됨)
   cd server
   npm run init-db
   npm run update-images
   ```

✅ **완료**: 데이터베이스에 테이블과 초기 데이터 생성됨

---

### 3단계: 백엔드 API 서버 배포 (Render)

1. **Render Dashboard → New Web Service**

2. **GitHub 저장소 연결**
   - Repository: 방금 생성한 GitHub 저장소 선택

3. **설정 입력**
   - Name: `cozy-order-api` (또는 원하는 이름)
   - Region: `Oregon (US West)` (DB와 동일)
   - Branch: `main`
   - Root Directory: `server`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: `Free`

4. **환경변수 설정 (Environment Variables)**
   ```
   NODE_ENV=production
   PORT=5001
   DB_HOST=<Render PostgreSQL의 Internal Host>
   DB_PORT=5432
   DB_NAME=<Database Name>
   DB_USER=<Database User>
   DB_PASSWORD=<Database Password>
   FRONTEND_URL=<프론트엔드 URL - 4단계 후 추가>
   ```

5. **Deploy** 클릭

6. **배포 완료 후 URL 확인**
   - 예: `https://cozy-order-api.onrender.com`

7. **테스트**
   ```bash
   curl https://cozy-order-api.onrender.com/api/health
   curl https://cozy-order-api.onrender.com/api/menus
   ```

---

### 4단계: 프론트엔드 배포 (Render)

1. **Render Dashboard → New Static Site**

2. **GitHub 저장소 연결**
   - Repository: 동일한 GitHub 저장소

3. **설정 입력**
   - Name: `cozy-order-app` (또는 원하는 이름)
   - Branch: `main`
   - Root Directory: `ui`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

4. **환경변수 설정 (Environment Variables)**
   ```
   VITE_API_URL=<백엔드 API URL>
   ```
   - 예: `VITE_API_URL=https://cozy-order-api.onrender.com`

5. **Deploy** 클릭

6. **배포 완료 후 URL 확인**
   - 예: `https://cozy-order-app.onrender.com`

---

### 5단계: CORS 설정 업데이트

백엔드의 환경변수에 프론트엔드 URL 추가:

1. **Render Dashboard → Backend Web Service → Environment**

2. **환경변수 추가/수정**
   ```
   FRONTEND_URL=https://cozy-order-app.onrender.com
   ```

3. **Save Changes** → 자동으로 재배포됨

---

## ✅ 배포 완료 체크리스트

- [ ] GitHub 저장소 생성 및 코드 푸시
- [ ] Render PostgreSQL 생성
- [ ] 데이터베이스 초기화 (테이블 및 데이터)
- [ ] 백엔드 API 서버 배포
- [ ] 백엔드 환경변수 설정
- [ ] 프론트엔드 Static Site 배포
- [ ] 프론트엔드 환경변수 설정 (VITE_API_URL)
- [ ] 백엔드 CORS 설정 (FRONTEND_URL)
- [ ] 앱 테스트 (주문하기, 관리자 페이지)

---

## 🔧 트러블슈팅

### 1. 이미지가 표시되지 않는 경우
- 백엔드 `server/public/images/` 폴더에 이미지가 있는지 확인
- Git에 이미지 파일이 커밋되었는지 확인
- 백엔드 API URL이 올바른지 확인

### 2. CORS 에러가 발생하는 경우
- 백엔드 환경변수 `FRONTEND_URL`이 올바른지 확인
- 프론트엔드 URL과 정확히 일치하는지 확인 (https, 슬래시 등)

### 3. 데이터베이스 연결 오류
- SSL 설정 확인 (`database.js`)
- Internal Database URL 사용 권장 (같은 Render 리전)

### 4. Free Plan 주의사항
- 15분간 사용하지 않으면 서버가 sleep 상태로 전환
- 첫 요청 시 30초~1분 정도 소요될 수 있음

---

## 📱 배포된 앱 사용하기

1. **프론트엔드 URL 접속**
   - `https://cozy-order-app.onrender.com`

2. **주문하기 탭**
   - 커피 선택 및 주문

3. **관리자 탭**
   - 주문 현황 확인
   - 재고 관리
   - 주문 상태 변경

---

## 🔄 업데이트 배포

코드 수정 후:

```bash
git add .
git commit -m "Update: 기능 설명"
git push origin main
```

- Render가 자동으로 새로운 커밋을 감지하고 재배포합니다.

---

## 📞 도움이 필요하신가요?

- [Render 공식 문서](https://render.com/docs)
- [Express.js 문서](https://expressjs.com/)
- [React + Vite 문서](https://vitejs.dev/)

