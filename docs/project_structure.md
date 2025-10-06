# 📁 COZY 커피 주문 앱 - 프로젝트 구조

## 📊 전체 구조 개요

```
order-app/
├── ui/                      # 프론트엔드 (React + Vite)
├── server/                  # 백엔드 (Node.js + Express)
├── docs/                    # 프로젝트 문서
├── README.md               # 프로젝트 메인 문서
├── DEPLOYMENT.md           # 전체 배포 가이드
├── FRONTEND_DEPLOY.md      # 프론트엔드 배포 가이드
└── QUICK_START.md          # 빠른 시작 가이드
```

---

## 🎨 프론트엔드 (ui/)

### 디렉토리 구조

```
ui/
├── public/                     # 정적 파일
│   └── images/                # 커피 이미지 (로컬 개발용)
│       ├── americano.jpg
│       ├── cappuccino.jpg
│       ├── latte.jpg
│       └── README.md
│
├── src/                       # 소스 코드
│   ├── components/           # React 컴포넌트
│   │   ├── Header.jsx       # 헤더 (네비게이션)
│   │   ├── Header.css
│   │   ├── MenuCard.jsx     # 메뉴 카드
│   │   ├── MenuCard.css
│   │   ├── ShoppingCart.jsx # 장바구니
│   │   ├── ShoppingCart.css
│   │   ├── AdminDashboard.jsx  # 관리자 대시보드
│   │   ├── AdminDashboard.css
│   │   ├── InventoryCard.jsx   # 재고 카드
│   │   ├── InventoryCard.css
│   │   ├── OrderItem.jsx       # 주문 항목
│   │   └── OrderItem.css
│   │
│   ├── pages/                # 페이지 컴포넌트
│   │   ├── OrderPage.jsx    # 주문하기 페이지
│   │   ├── OrderPage.css
│   │   ├── AdminPage.jsx    # 관리자 페이지
│   │   └── AdminPage.css
│   │
│   ├── config/               # 설정 파일
│   │   └── api.js           # API 클라이언트 설정
│   │
│   ├── App.jsx              # 메인 앱 컴포넌트
│   ├── App.css
│   ├── main.jsx             # React 진입점
│   └── index.css            # 전역 스타일
│
├── index.html                # HTML 템플릿
├── vite.config.js           # Vite 설정
├── package.json             # 의존성 및 스크립트
├── .gitignore              # Git 제외 파일
├── README.md               # 프론트엔드 문서
└── DEPLOYMENT_GUIDE.md     # 프론트엔드 배포 가이드
```

### 주요 파일 설명

#### 📄 src/main.jsx
- **역할**: React 애플리케이션 진입점
- **기능**: App 컴포넌트를 DOM에 렌더링

#### 📄 src/App.jsx
- **역할**: 메인 애플리케이션 컴포넌트
- **기능**: 
  - 탭 전환 관리 (주문하기 ↔ 관리자)
  - Header와 페이지 컴포넌트 렌더링

#### 📁 src/components/
컴포넌트 단위로 UI를 구성하는 재사용 가능한 요소들

- **Header.jsx**: 브랜드명과 탭 네비게이션
- **MenuCard.jsx**: 개별 커피 메뉴 카드 (이미지, 이름, 가격, 옵션, 담기 버튼)
- **ShoppingCart.jsx**: 장바구니 (선택한 메뉴 목록, 총 금액, 주문하기 버튼)
- **AdminDashboard.jsx**: 주문 통계 (총 주문, 접수, 제조중, 완료)
- **InventoryCard.jsx**: 개별 메뉴의 재고 정보 및 조정
- **OrderItem.jsx**: 주문 상세 정보 및 상태 변경 버튼

#### 📁 src/pages/
전체 페이지 단위의 컴포넌트

- **OrderPage.jsx**: 주문하기 화면 (메뉴 그리드 + 장바구니)
- **AdminPage.jsx**: 관리자 화면 (대시보드 + 재고 + 주문 현황)

#### 📄 src/config/api.js
- **역할**: 백엔드 API 통신 클라이언트
- **기능**:
  - API 기본 URL 설정 (`VITE_API_URL` 환경변수)
  - 메뉴, 주문, 관리자 API 함수 제공
  - GET, POST, PATCH 요청 헬퍼

#### 📄 vite.config.js
- **역할**: Vite 빌드 도구 설정
- **내용**: React 플러그인, 개발 서버 포트(3000)

---

## ⚙️ 백엔드 (server/)

### 디렉토리 구조

```
server/
├── public/                    # 정적 파일 (배포용)
│   └── images/               # 커피 이미지
│       ├── americano.jpg
│       ├── cappuccino.jpg
│       └── latte.jpg
│
├── src/
│   ├── config/               # 설정 파일
│   │   ├── database.js      # PostgreSQL 연결 설정
│   │   ├── initDatabase.js  # DB 초기화 스크립트
│   │   └── updateImages.js  # 이미지 URL 업데이트 스크립트
│   │
│   ├── routes/               # API 라우트
│   │   ├── menuRoutes.js    # 메뉴 관련 라우트
│   │   ├── orderRoutes.js   # 주문 관련 라우트
│   │   └── adminRoutes.js   # 관리자 관련 라우트
│   │
│   └── controllers/          # 비즈니스 로직
│       ├── menuController.js   # 메뉴 컨트롤러
│       ├── orderController.js  # 주문 컨트롤러
│       └── adminController.js  # 관리자 컨트롤러
│
├── server.js                 # Express 서버 진입점
├── package.json             # 의존성 및 스크립트
├── .env                     # 환경변수 (Git 제외)
├── .gitignore              # Git 제외 파일
└── README.md               # 백엔드 문서
```

### 주요 파일 설명

#### 📄 server.js
- **역할**: Express 서버 메인 파일
- **기능**:
  - Express 앱 설정
  - 미들웨어 등록 (CORS, JSON 파싱)
  - 정적 파일 제공 (`/images`)
  - API 라우트 연결
  - 에러 핸들링
  - 서버 시작 및 DB 연결 테스트

#### 📁 src/config/

##### database.js
- **역할**: PostgreSQL 데이터베이스 연결 풀 설정
- **기능**:
  - 환경변수에서 DB 정보 읽기
  - SSL 연결 설정 (Render용)
  - 연결 풀 관리
  - Query 헬퍼 함수 제공

##### initDatabase.js
- **역할**: 데이터베이스 초기화 스크립트
- **기능**:
  - 테이블 생성 (menus, options, orders, order_items, order_item_options)
  - 인덱스 생성
  - 샘플 데이터 삽입 (메뉴, 옵션, 샘플 주문)
- **실행**: `npm run init-db`

##### updateImages.js
- **역할**: 메뉴 이미지 URL 업데이트 스크립트
- **기능**: 데이터베이스의 `image_url` 필드를 업데이트
- **실행**: `npm run update-images`

#### 📁 src/routes/
API 엔드포인트 정의

##### menuRoutes.js
- `GET /api/menus` - 전체 메뉴 및 옵션 조회
- `GET /api/menus/:menuId` - 특정 메뉴 조회

##### orderRoutes.js
- `POST /api/orders` - 주문 생성 (재고 차감 포함)
- `GET /api/orders/:orderId` - 주문 상세 조회

##### adminRoutes.js
- `GET /api/admin/dashboard` - 주문 통계
- `GET /api/admin/inventory` - 재고 현황
- `PATCH /api/admin/inventory/:menuId` - 재고 조정
- `GET /api/admin/orders` - 주문 목록 조회
- `PATCH /api/admin/orders/:orderId/status` - 주문 상태 변경

#### 📁 src/controllers/
비즈니스 로직 구현

##### menuController.js
- **기능**: 메뉴 데이터 조회 로직
- **메서드**:
  - `getAllMenus()`: 전체 메뉴와 옵션 조회
  - `getMenuById()`: 특정 메뉴 조회

##### orderController.js
- **기능**: 주문 처리 로직
- **메서드**:
  - `createOrder()`: 주문 생성 및 재고 차감 (트랜잭션)
  - `getOrderById()`: 주문 상세 조회

##### adminController.js
- **기능**: 관리자 기능 로직
- **메서드**:
  - `getDashboard()`: 주문 통계 계산
  - `getInventory()`: 재고 현황 조회
  - `updateStock()`: 재고 조정
  - `getOrders()`: 주문 목록 조회
  - `updateOrderStatus()`: 주문 상태 변경

#### 📁 public/images/
- **역할**: 정적 이미지 파일 저장
- **제공**: `/images/파일명.jpg` 경로로 접근 가능
- **용도**: 프론트엔드에서 이미지 로드

---

## 📚 문서 (docs/)

```
docs/
├── PRD.md                    # 제품 요구사항 명세서
└── project_structure.md      # 프로젝트 구조 문서 (이 파일)
```

### PRD.md
- **역할**: 프로젝트 요구사항 및 설계 문서
- **내용**:
  - 프로젝트 개요
  - 주요 기능
  - 프론트엔드 UI 명세
  - 백엔드 API 명세
  - 데이터베이스 스키마
  - 사용자 흐름

---

## 📝 루트 레벨 문서

### README.md
- **역할**: 프로젝트 전체 개요
- **내용**: 
  - 프로젝트 소개
  - 기술 스택
  - 로컬 개발 환경 설정
  - API 엔드포인트 요약

### DEPLOYMENT.md
- **역할**: Render.com 전체 배포 가이드
- **내용**:
  - PostgreSQL 데이터베이스 배포
  - 백엔드 API 서버 배포
  - 프론트엔드 Static Site 배포
  - 환경변수 설정
  - 트러블슈팅

### FRONTEND_DEPLOY.md
- **역할**: 프론트엔드 배포 빠른 가이드
- **내용**: 프론트엔드만 배포하는 간단한 절차

### QUICK_START.md
- **역할**: 전체 배포 빠른 시작 가이드
- **내용**: GitHub 푸시부터 배포 완료까지의 체크리스트

---

## 🗄️ 데이터베이스 구조

### 테이블

#### menus
커피 메뉴 정보
- `id`, `name`, `description`, `price`, `image_url`, `current_stock`, `created_at`

#### options
메뉴 옵션 (샷 추가, 우유 변경 등)
- `id`, `menu_id`, `name`, `price`, `created_at`

#### orders
주문 정보
- `id`, `total_price`, `status`, `order_time`

#### order_items
주문별 메뉴 항목
- `id`, `order_id`, `menu_id`, `menu_name`, `quantity`, `unit_price`

#### order_item_options
주문 항목별 선택된 옵션
- `id`, `order_item_id`, `option_id`, `option_name`, `option_price`

---

## 🔄 데이터 흐름

### 주문하기 프로세스

```
사용자 → 프론트엔드 → 백엔드 API → 데이터베이스
  ↓          ↓            ↓              ↓
메뉴 선택  MenuCard   GET /api/menus   menus 테이블
  ↓          ↓            ↓              ↓
옵션 선택  체크박스   옵션 데이터      options 테이블
  ↓          ↓            ↓              ↓
장바구니  ShoppingCart  상태 관리        -
  ↓          ↓            ↓              ↓
주문하기  OrderPage   POST /api/orders  orders 생성
                                      + 재고 차감
```

### 관리자 프로세스

```
관리자 → 프론트엔드 → 백엔드 API → 데이터베이스
  ↓          ↓            ↓              ↓
대시보드   AdminDashboard  GET /admin/dashboard  통계 계산
  ↓          ↓            ↓              ↓
재고 관리  InventoryCard  PATCH /admin/inventory/:id  current_stock 업데이트
  ↓          ↓            ↓              ↓
주문 상태  OrderItem   PATCH /admin/orders/:id/status  status 업데이트
```

---

## 🚀 배포 구조

### 개발 환경
```
localhost:3000 (프론트엔드) → localhost:5001 (백엔드) → localhost:5432 (PostgreSQL)
```

### 프로덕션 환경 (Render)
```
Static Site (프론트엔드) → Web Service (백엔드) → PostgreSQL Database
     ↓                          ↓                        ↓
 Vite 빌드                Express 서버              Render Postgres
 dist/ 폴더              Node.js 실행              SSL 연결
```

---

## 📦 주요 의존성

### 프론트엔드 (ui/package.json)
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.7"
  }
}
```

### 백엔드 (server/package.json)
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.3",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

---

## 🔐 환경변수

### 프론트엔드 (.env)
```
VITE_API_URL=http://localhost:5001
```

### 백엔드 (.env)
```
PORT=5001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cozy_order_db
DB_USER=your_username
DB_PASSWORD=your_password
FRONTEND_URL=http://localhost:3000
```

---

## 🧪 npm 스크립트

### 프론트엔드
```bash
npm run dev      # 개발 서버 시작 (http://localhost:3000)
npm run build    # 프로덕션 빌드 (dist/ 폴더 생성)
npm run preview  # 빌드 결과 미리보기
```

### 백엔드
```bash
npm start            # 프로덕션 서버 시작
npm run dev          # 개발 서버 시작 (nodemon)
npm run init-db      # 데이터베이스 초기화
npm run update-images # 이미지 URL 업데이트
```

---

## 📂 Git 제외 파일

### 프론트엔드 (.gitignore)
- `node_modules/`
- `dist/`
- `.env`
- IDE 설정 파일

### 백엔드 (.gitignore)
- `node_modules/`
- `.env`
- 로그 파일
- 임시 파일
- IDE 설정 파일

---

## 🎯 주요 기능별 파일 매핑

### 메뉴 표시
- **프론트**: `MenuCard.jsx`, `OrderPage.jsx`
- **백엔드**: `menuRoutes.js`, `menuController.js`
- **DB**: `menus`, `options` 테이블

### 주문 생성
- **프론트**: `ShoppingCart.jsx`, `OrderPage.jsx`
- **백엔드**: `orderRoutes.js`, `orderController.js`
- **DB**: `orders`, `order_items`, `order_item_options` 테이블

### 재고 관리
- **프론트**: `InventoryCard.jsx`, `AdminPage.jsx`
- **백엔드**: `adminRoutes.js`, `adminController.js`
- **DB**: `menus` 테이블의 `current_stock` 필드

### 주문 상태 관리
- **프론트**: `OrderItem.jsx`, `AdminPage.jsx`
- **백엔드**: `adminRoutes.js`, `adminController.js`
- **DB**: `orders` 테이블의 `status` 필드

---

## 📊 컴포넌트 계층 구조

### 주문하기 페이지
```
App
└── OrderPage
    ├── MenuCard (여러 개)
    │   └── 옵션 체크박스들
    └── ShoppingCart
        └── CartItem (여러 개)
```

### 관리자 페이지
```
App
└── AdminPage
    ├── AdminDashboard
    │   └── 통계 카드들
    ├── InventoryCard (여러 개)
    │   └── 재고 조정 버튼들
    └── OrderItem (여러 개)
        └── 상태 변경 버튼
```

---

## 🔍 파일 탐색 가이드

### 프론트엔드 수정 시
1. **UI 레이아웃**: `src/components/*.jsx` 및 `*.css`
2. **페이지 로직**: `src/pages/*.jsx`
3. **API 통신**: `src/config/api.js`
4. **전역 스타일**: `src/index.css`

### 백엔드 수정 시
1. **API 엔드포인트**: `src/routes/*.js`
2. **비즈니스 로직**: `src/controllers/*.js`
3. **DB 연결**: `src/config/database.js`
4. **서버 설정**: `server.js`

### 문서 수정 시
1. **제품 요구사항**: `docs/PRD.md`
2. **프로젝트 구조**: `docs/project_structure.md`
3. **배포 가이드**: `DEPLOYMENT.md`, `FRONTEND_DEPLOY.md`

---

## 🎓 학습 경로

### 프로젝트 이해하기
1. **시작**: `README.md` - 전체 개요 파악
2. **요구사항**: `docs/PRD.md` - 기능 및 설계 이해
3. **구조**: `docs/project_structure.md` - 이 문서
4. **코드**: 프론트엔드 → 백엔드 → 데이터베이스 순서로 탐색

### 개발 시작하기
1. **환경 설정**: `README.md`의 로컬 개발 환경 설정 참조
2. **프론트엔드**: `ui/src/main.jsx`부터 시작
3. **백엔드**: `server/server.js`부터 시작
4. **DB**: `server/src/config/initDatabase.js` 확인

### 배포하기
1. **준비**: `QUICK_START.md` 확인
2. **실행**: `FRONTEND_DEPLOY.md` 또는 `DEPLOYMENT.md` 참조
3. **문제 해결**: 각 가이드의 트러블슈팅 섹션 참조

---

**문서 업데이트**: 2025-10-06  
**버전**: 1.0.0  
**작성자**: COZY Development Team

