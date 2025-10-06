# ☕ COZY - 커피 주문 앱

간편한 커피 주문과 관리를 위한 풀스택 웹 애플리케이션

## 📖 프로젝트 개요

COZY는 커피숍에서 사용할 수 있는 주문 및 관리 시스템입니다.
고객은 메뉴를 보고 주문할 수 있으며, 관리자는 주문 현황과 재고를 실시간으로 확인하고 관리할 수 있습니다.

## ✨ 주요 기능

### 주문하기 (Customer View)
- 📋 커피 메뉴 목록 표시
- ☕ 옵션 선택 (샷 추가, 우유 변경 등)
- 🛒 장바구니 기능
- 💳 간편 주문

### 관리자 (Admin View)
- 📊 주문 통계 대시보드
- 📦 재고 관리
- 🔄 주문 상태 관리 (접수 → 제조중 → 완료)

## 🛠️ 기술 스택

### Frontend
- **React** - UI 라이브러리
- **Vite** - 빌드 도구
- **CSS** - 스타일링

### Backend
- **Node.js** - 런타임
- **Express.js** - 웹 프레임워크
- **PostgreSQL** - 데이터베이스

### Deployment
- **Render.com** - 호스팅 플랫폼

## 📁 프로젝트 구조

```
order-app/
├── ui/                    # 프론트엔드
│   ├── src/
│   │   ├── components/   # React 컴포넌트
│   │   ├── pages/        # 페이지 컴포넌트
│   │   ├── config/       # API 설정
│   │   └── App.jsx       # 메인 앱
│   └── public/           # 정적 파일
│
├── server/               # 백엔드
│   ├── src/
│   │   ├── config/       # DB 설정
│   │   ├── routes/       # API 라우트
│   │   └── controllers/  # 비즈니스 로직
│   ├── public/images/    # 메뉴 이미지
│   └── server.js         # 서버 엔트리
│
├── docs/                 # 문서
│   └── PRD.md           # 제품 요구사항 명세
│
├── DEPLOYMENT.md         # 배포 가이드
└── README.md            # 이 파일
```

## 🚀 로컬 개발 환경 설정

### 사전 요구사항
- Node.js (v18 이상)
- PostgreSQL (v14 이상)
- npm 또는 yarn

### 1. 저장소 클론

```bash
git clone <repository-url>
cd order-app
```

### 2. 백엔드 설정

```bash
cd server
npm install

# .env 파일 생성
cat > .env << EOF
PORT=5001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cozy_order_db
DB_USER=your_username
DB_PASSWORD=your_password
FRONTEND_URL=http://localhost:3000
EOF

# 데이터베이스 초기화
npm run init-db

# 이미지 URL 업데이트
npm run update-images

# 서버 실행
npm run dev
```

서버: http://localhost:5001

### 3. 프론트엔드 설정

```bash
cd ui
npm install

# 개발 서버 실행
npm run dev
```

앱: http://localhost:3000

## 📡 API 엔드포인트

### 메뉴
- `GET /api/menus` - 전체 메뉴 조회
- `GET /api/menus/:menuId` - 특정 메뉴 조회

### 주문
- `POST /api/orders` - 주문 생성
- `GET /api/orders/:orderId` - 주문 조회

### 관리자
- `GET /api/admin/dashboard` - 대시보드 통계
- `GET /api/admin/inventory` - 재고 현황
- `PATCH /api/admin/inventory/:menuId` - 재고 조정
- `GET /api/admin/orders` - 주문 목록
- `PATCH /api/admin/orders/:orderId/status` - 주문 상태 변경

자세한 API 명세는 [PRD.md](docs/PRD.md) 참조

## 🌐 배포

Render.com에 배포하는 상세한 가이드는 [DEPLOYMENT.md](DEPLOYMENT.md)를 참조하세요.

### 빠른 배포 체크리스트
1. ✅ PostgreSQL 데이터베이스 생성
2. ✅ 백엔드 API 서버 배포
3. ✅ 프론트엔드 Static Site 배포
4. ✅ 환경변수 설정
5. ✅ CORS 설정

## 📸 스크린샷

### 주문하기 화면
- 메뉴 목록과 장바구니

### 관리자 화면
- 대시보드, 재고 관리, 주문 현황

## 🧪 테스트

```bash
# 백엔드
cd server
npm test  # (추후 추가 예정)

# 프론트엔드
cd ui
npm test  # (추후 추가 예정)
```

## 📝 개발 로그

프로젝트 개발 과정과 의사결정은 [docs/PRD.md](docs/PRD.md)에 문서화되어 있습니다.

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

This project is licensed under the ISC License.

## 👤 제작자

Denny Ahn

---

**COZY** - 커피 한 잔의 여유를 더 쉽게 ☕

