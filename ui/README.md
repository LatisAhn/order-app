# COZY 커피 주문 앱 - 프런트엔드

React와 Vite를 사용한 커피 주문 앱 UI

## 기술 스택

- **React 18.3** - UI 라이브러리
- **Vite 6.0** - 빌드 도구
- **Vanilla JavaScript** - 추가 프레임워크 없이 순수 JS 사용

## 시작하기

### 1. npm 캐시 권한 문제 해결 (필요한 경우)

npm 설치 중 권한 오류가 발생하면 터미널에서 다음 명령어를 실행하세요:

```bash
sudo chown -R $(whoami) ~/.npm
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 자동으로 http://localhost:3000 이 열립니다.

## 사용 가능한 스크립트

- `npm run dev` - 개발 서버 실행 (포트 3000)
- `npm run build` - 프로덕션 빌드 생성
- `npm run preview` - 빌드된 앱 미리보기

## 프로젝트 구조

```
ui/
├── src/
│   ├── main.jsx          # 앱 진입점
│   ├── App.jsx           # 메인 앱 컴포넌트
│   ├── App.css           # 앱 스타일
│   └── index.css         # 전역 스타일
├── index.html            # HTML 템플릿
├── vite.config.js        # Vite 설정
└── package.json          # 프로젝트 설정
```

## 개발 계획

### 주문하기 화면
- 메뉴 카드 컴포넌트
- 장바구니 컴포넌트
- 옵션 선택 기능
- 주문 처리 기능

### 관리자 화면
- 대시보드 컴포넌트
- 재고 관리 컴포넌트
- 주문 현황 컴포넌트
- 주문 상태 관리 기능

