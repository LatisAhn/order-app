# 🚀 COZY 커피 주문 앱 - 빠른 시작 가이드

## 📋 현재 상태

✅ **로컬 개발 환경**: 완료  
✅ **데이터베이스**: Render PostgreSQL 설정 완료  
✅ **백엔드 코드**: 배포 준비 완료  
✅ **프론트엔드 코드**: 배포 준비 완료  
✅ **프로덕션 빌드**: 테스트 완료  

---

## 🎯 다음 단계: Render 배포

### 배포 순서

```
1. GitHub 푸시 → 2. 백엔드 배포 → 3. 프론트엔드 배포
```

---

## 1️⃣ GitHub에 코드 푸시

```bash
cd /Users/denny.ahn/Documents/CursorTest/order-app

# 변경사항 확인
git status

# 모든 변경사항 추가
git add .

# 커밋
git commit -m "feat: Render 배포 준비 완료 - 프론트엔드/백엔드/DB 설정"

# GitHub에 푸시 (저장소가 이미 연결되어 있다면)
git push origin main

# 저장소가 아직 없다면
# 1. GitHub에서 새 저장소 생성
# 2. git remote add origin <저장소-URL>
# 3. git push -u origin main
```

---

## 2️⃣ 백엔드 API 배포 (Render)

### 배포 설정
- **서비스 타입**: Web Service
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 환경변수 (Render에서 설정)
```
NODE_ENV=production
PORT=5001
DB_HOST=dpg-d3hrhiqli9vc7396nqdg-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=order_app_db_qzww
DB_USER=order_app_db_qzww_user
DB_PASSWORD=qBRl6lzwWUPTHMekynAhNihQruEGLDlv
FRONTEND_URL=<프론트엔드 URL - 3단계 후 추가>
```

📖 **상세 가이드**: `DEPLOYMENT.md` 참조

---

## 3️⃣ 프론트엔드 배포 (Render)

### 배포 설정
- **서비스 타입**: Static Site
- **Root Directory**: `ui`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

### 환경변수 (Render에서 설정)
```
VITE_API_URL=<백엔드 API URL>
```

### ✅ 빌드 테스트 완료
```
✓ 45 modules transformed
✓ dist/index.html (0.47 kB)
✓ dist/assets/index-*.css (9.03 kB)
✓ dist/assets/index-*.js (154.84 kB)
✓ built in 357ms
```

📖 **상세 가이드**: `FRONTEND_DEPLOY.md` 참조

---

## 4️⃣ CORS 설정 업데이트

프론트엔드 배포 후, 백엔드 환경변수에 추가:

```
FRONTEND_URL=https://cozy-order-app.onrender.com
```

---

## 📚 관련 문서

| 문서 | 설명 |
|------|------|
| `README.md` | 프로젝트 전체 개요 |
| `DEPLOYMENT.md` | 전체 배포 가이드 (PostgreSQL + 백엔드 + 프론트엔드) |
| `FRONTEND_DEPLOY.md` | 프론트엔드 배포 빠른 가이드 |
| `ui/DEPLOYMENT_GUIDE.md` | 프론트엔드 배포 상세 가이드 |
| `docs/PRD.md` | 제품 요구사항 명세서 |

---

## 🔧 코드 수정 요약

### ✅ 배포를 위해 수정된 파일

1. **server/src/config/database.js**
   - SSL 연결 설정 추가 (Render PostgreSQL용)

2. **server/server.js**
   - 정적 파일 제공 미들웨어 추가 (`/images`)

3. **ui/src/config/api.js**
   - `API_BASE_URL` export 추가
   - 환경변수 지원 (`VITE_API_URL`)

4. **ui/src/components/MenuCard.jsx**
   - 백엔드 서버 기준 이미지 URL 생성

### 📁 추가된 파일

- `server/public/images/` - 커피 이미지 (3개)
- `DEPLOYMENT.md` - 전체 배포 가이드
- `FRONTEND_DEPLOY.md` - 프론트엔드 빠른 배포 가이드
- `ui/DEPLOYMENT_GUIDE.md` - 프론트엔드 상세 가이드
- `QUICK_START.md` - 이 파일

---

## ✅ 배포 체크리스트

### 사전 준비
- [ ] GitHub 저장소 생성
- [ ] 코드 커밋 및 푸시
- [ ] Render 계정 생성

### PostgreSQL (이미 완료)
- [x] Render PostgreSQL 생성
- [x] 테이블 생성 및 초기 데이터 삽입
- [x] 이미지 URL 설정

### 백엔드 배포
- [ ] Render Web Service 생성
- [ ] GitHub 저장소 연결
- [ ] Root Directory: `server`
- [ ] 빌드 설정 입력
- [ ] 환경변수 설정 (DB 정보)
- [ ] 배포 성공 확인
- [ ] API 테스트 (`/api/health`, `/api/menus`)

### 프론트엔드 배포
- [ ] Render Static Site 생성
- [ ] GitHub 저장소 연결
- [ ] Root Directory: `ui`
- [ ] 빌드 설정 입력
- [ ] 환경변수 설정 (`VITE_API_URL`)
- [ ] 배포 성공 확인

### 최종 설정
- [ ] 백엔드 `FRONTEND_URL` 환경변수 추가
- [ ] 전체 기능 테스트
  - [ ] 주문하기
  - [ ] 장바구니
  - [ ] 관리자 대시보드
  - [ ] 재고 관리
  - [ ] 주문 상태 변경

---

## 🎉 배포 완료 예상 결과

### 프론트엔드
- URL: `https://cozy-order-app.onrender.com`
- 빌드 시간: 3-5분
- 자동 재배포: Git push 시

### 백엔드
- URL: `https://cozy-order-api.onrender.com`
- 시작 시간: 2-3분
- 자동 재배포: Git push 시

### 데이터베이스
- Host: `dpg-d3hrhiqli9vc7396nqdg-a.oregon-postgres.render.com`
- 상태: 실행 중
- 데이터: 초기 메뉴 및 옵션 설정 완료

---

## 💡 배포 팁

### Free Plan 특징
- ⏰ **15분 idle 후 sleep**: 첫 요청 시 30초~1분 소요
- 💰 **비용**: 완전 무료
- 📊 **대역폭**: 월 100GB (충분함)

### 성능 향상
- 두 서비스 모두 같은 Region에 배포 (Oregon 추천)
- Internal Database URL 사용 (외부보다 빠름)

### 보안
- 환경변수로 민감 정보 관리
- CORS 설정으로 접근 제어
- SSL 자동 적용 (HTTPS)

---

## 📞 도움말

### 문제 발생 시
1. Render 빌드 로그 확인
2. 브라우저 개발자 도구 Console 확인
3. 환경변수 재확인
4. 관련 문서 참조

### 추가 지원
- [Render 공식 문서](https://render.com/docs)
- [Vite 문서](https://vitejs.dev/)
- [React 문서](https://react.dev/)

---

**준비 완료! 이제 Render에 배포하세요!** 🚀☕

