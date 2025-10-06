# COZY 커피 주문 앱 - 백엔드 서버

Node.js와 Express.js를 사용한 RESTful API 서버

## 기술 스택

- **Node.js** - JavaScript 런타임
- **Express.js** - 웹 프레임워크
- **PostgreSQL** - 관계형 데이터베이스
- **pg** - PostgreSQL 클라이언트
- **dotenv** - 환경 변수 관리
- **cors** - CORS 설정

## 시작하기

### 1. 환경 설정

`.env.example` 파일을 복사하여 `.env` 파일을 생성하고 데이터베이스 정보를 입력하세요:

```bash
cp .env.example .env
```

`.env` 파일 수정:
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=cozy_order_db
DB_USER=postgres
DB_PASSWORD=your_password

FRONTEND_URL=http://localhost:3000
```

### 2. 의존성 설치

```bash
npm install
```

### 3. PostgreSQL 데이터베이스 생성

PostgreSQL에 접속하여 데이터베이스를 생성하세요:

```sql
CREATE DATABASE cozy_order_db;
```

### 4. 데이터베이스 초기화

테이블 생성 및 샘플 데이터 삽입:

```bash
npm run init-db
```

### 5. 서버 실행

**개발 모드 (nodemon 사용)**:
```bash
npm run dev
```

**프로덕션 모드**:
```bash
npm start
```

서버는 기본적으로 http://localhost:5000 에서 실행됩니다.

## API 엔드포인트

### Health Check
- `GET /api/health` - 서버 상태 확인

### 메뉴 관련
- `GET /api/menus` - 전체 메뉴 목록 조회
- `GET /api/menus/:menuId` - 특정 메뉴 조회

### 주문 관련
- `POST /api/orders` - 주문 생성
- `GET /api/orders/:orderId` - 주문 상세 조회

### 관리자 관련
- `GET /api/admin/dashboard` - 대시보드 통계
- `GET /api/admin/inventory` - 재고 현황 조회
- `PATCH /api/admin/inventory/:menuId` - 재고 수량 조정
- `GET /api/admin/orders` - 전체 주문 목록 조회
- `PATCH /api/admin/orders/:orderId/status` - 주문 상태 변경

자세한 API 명세는 `/docs/PRD.md` 파일의 백엔드 섹션을 참고하세요.

## 프로젝트 구조

```
server/
├── src/
│   ├── config/          # 설정 파일
│   │   ├── database.js  # 데이터베이스 연결
│   │   └── initDatabase.js  # DB 초기화 스크립트
│   ├── routes/          # 라우트 정의
│   │   ├── menuRoutes.js
│   │   ├── orderRoutes.js
│   │   └── adminRoutes.js
│   ├── controllers/     # 비즈니스 로직
│   │   ├── menuController.js
│   │   ├── orderController.js
│   │   └── adminController.js
│   ├── models/          # 데이터 모델 (추후 추가)
│   ├── middleware/      # 미들웨어 (추후 추가)
│   └── utils/           # 유틸리티 함수 (추후 추가)
├── .env.example         # 환경 변수 예시
├── .gitignore
├── package.json
├── server.js            # 진입점
└── README.md
```

## 데이터베이스 스키마

### 테이블
- **menus** - 메뉴 정보
- **options** - 메뉴 옵션
- **orders** - 주문 정보
- **order_items** - 주문 항목
- **order_item_options** - 주문 항목 옵션

자세한 스키마는 `/docs/PRD.md` 파일을 참고하세요.

## 개발 가이드

### 새로운 API 추가

1. `src/routes/` 에 라우트 파일 생성 또는 수정
2. `src/controllers/` 에 컨트롤러 함수 작성
3. `server.js` 에 라우트 등록

### 데이터베이스 쿼리 실행

```javascript
const db = require('./config/database');

const result = await db.query('SELECT * FROM menus WHERE id = $1', [menuId]);
```

### 에러 처리

모든 컨트롤러는 try-catch 블록으로 감싸고, 일관된 에러 응답 형식을 사용합니다:

```javascript
{
  "success": false,
  "error": "에러 메시지",
  "details": { /* 추가 정보 */ }
}
```

## 문제 해결

### 데이터베이스 연결 실패
- PostgreSQL이 실행 중인지 확인
- `.env` 파일의 데이터베이스 정보가 올바른지 확인
- 데이터베이스가 생성되었는지 확인

### 포트 충돌
- `.env` 파일에서 PORT 값을 변경

## 다음 단계

- [ ] 프런트엔드와 API 연동 테스트
- [ ] 에러 처리 강화
- [ ] 로깅 시스템 구축
- [ ] API 문서 자동화 (Swagger)
- [ ] 단위 테스트 작성



