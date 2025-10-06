# 커피 주문 앱

## 1. 프로젝트 개요

### 1.1 프로젝트 명
커피 주문 앱

### 1.2 프로젝트 목적
사용자가 커피 메뉴를 주문하고, 관리자가 주문을 관리할 수 있는 간단한 풀스택 웹 앱

### 1.3 개발 범위
- 주문하기 화면 (메뉴 선택 및 장바구니 기능)
- 관리자 화면(재고 관리 및 주문 상태 관리)
- 데이터를 생성/조회/수정/삭제할 수 있는 기능

## 2. 기술 스텍
- 프런트엔드: HTML, CSS, 리액트 자바스크립트
- 백엔드: Node.js, Express
- 데이터베이스: PostgreSQL

## 3. 기본 사항
- 프런트엔드와 백엔드를 따로 개발
- 기본적인 췝 기술만 사용
- 학습 목적이므로 사용자 인증이나 결제 기능은 제외
- 메뉴는 커피 메뉴만 있음

## 4. 프런트엔드 UI 명세

### 4.1 주문하기 화면

#### 4.1.1 화면 개요
사용자가 커피 메뉴를 선택하고 옵션을 추가하여 장바구니에 담은 후 주문할 수 있는 메인 화면

#### 4.1.2 레이아웃 구조

##### 상단 헤더
- **브랜드명**: "COZY" 로고 (좌측 정렬)
- **네비게이션 탭**:
  - "주문하기" 탭 (활성 상태)
  - "관리자" 탭
- 디자인: 헤더는 전체 너비를 차지하며, 테두리로 구분

##### 메뉴 영역 (메인 컨텐츠)
- **레이아웃**: 그리드 형태로 메뉴 카드 배치 (가로 3개씩 정렬)
- **메뉴 카드 구성**:
  - 이미지 영역: 메뉴 사진 표시 (카드 상단, 16:9 비율)
  - 메뉴명: 메뉴 이름 표시 (예: "아메리카노(ICE)", "카페라떼")
  - 가격: 기본 가격 표시 (예: "4,000원")
  - 설명: 간단한 메뉴 설명 (예: "간단한 설명...")
  - 옵션 선택:
    - 체크박스: 옵션명과 추가 금액 표시
    - 예시: ☐ 샷 추가 (+500원), ☐ 시럽 추가 (+0원)
  - "담기" 버튼: 카드 하단에 배치, 클릭 시 장바구니에 추가

##### 장바구니 영역 (하단)
- **위치**: 화면 하단에 고정 또는 메뉴 영역 하단에 배치
- **제목**: "장바구니"
- **장바구니 아이템 리스트**:
  - 각 아이템: 메뉴명 (옵션 표시) x 수량, 금액
  - 예시: "아메리카노(ICE) (샷 추가) x 1 | 4,500원"
  - 예시: "아메리카노(HOT) x 2 | 8,000원"
- **총 금액 표시**:
  - "총 금액" 라벨과 합계 금액 표시
  - 예시: "총 금액 12,500원"
  - 우측 정렬, 강조 표시
- **"주문하기" 버튼**:
  - 장바구니 영역 우측 하단에 배치
  - 클릭 시 주문 처리

#### 4.1.3 UI 컴포넌트 명세

##### 1. 헤더 컴포넌트
```
컴포넌트명: Header
Props: 
  - currentTab: string (현재 활성 탭)
기능:
  - 브랜드명 표시
  - 탭 전환 기능 (주문하기 ↔ 관리자)
```

##### 2. 메뉴 카드 컴포넌트
```
컴포넌트명: MenuCard
Props:
  - menuId: string
  - menuName: string
  - price: number
  - description: string
  - imageUrl: string
  - options: Array<{id: string, name: string, price: number}>
상태:
  - selectedOptions: Array<string> (선택된 옵션 ID 목록)
기능:
  - 옵션 체크박스 토글
  - "담기" 버튼 클릭 시 장바구니에 추가 이벤트 발생
```

##### 3. 장바구니 컴포넌트
```
컴포넌트명: ShoppingCart
Props:
  - cartItems: Array<{menuId: string, menuName: string, options: Array, quantity: number, totalPrice: number}>
기능:
  - 장바구니 아이템 목록 표시
  - 총 금액 계산 및 표시
  - "주문하기" 버튼 클릭 시 주문 처리
```

##### 4. 장바구니 아이템 컴포넌트
```
컴포넌트명: CartItem
Props:
  - menuName: string
  - options: Array<string>
  - quantity: number
  - totalPrice: number
기능:
  - 아이템 정보 표시
```

#### 4.1.4 사용자 인터랙션

##### 메뉴 선택 플로우
1. 사용자가 메뉴 카드에서 원하는 옵션을 체크박스로 선택
2. "담기" 버튼 클릭
3. 선택한 메뉴와 옵션이 장바구니에 추가됨
4. 장바구니 영역이 업데이트되어 새로운 아이템 표시
5. 총 금액이 자동으로 재계산되어 표시됨

##### 주문 플로우
1. 사용자가 장바구니에 원하는 메뉴를 모두 담음
2. "주문하기" 버튼 클릭
3. 주문 확인 또는 처리 (백엔드로 전송)
4. 주문 완료 후 장바구니 초기화

#### 4.1.5 반응형 디자인
- **데스크톱**: 메뉴 카드 3열 배치
- **태블릿**: 메뉴 카드 2열 배치
- **모바일**: 메뉴 카드 1열 배치

#### 4.1.6 스타일 가이드
- **색상**:
  - 주요 색상: 브랜드 컬러 (예: 브라운 계열)
  - 버튼 색상: 강조 색상
  - 배경 색상: 밝은 중성색
- **타이포그래피**:
  - 브랜드명: 굵은 폰트, 큰 사이즈
  - 메뉴명: 중간 굵기, 중간 사이즈
  - 가격: 강조 색상, 중간 사이즈
  - 설명: 가벼운 폰트, 작은 사이즈
- **간격**:
  - 카드 간 여백: 16px
  - 카드 내부 패딩: 16px
  - 섹션 간 여백: 24px
- **테두리**:
  - 카드: 1px 실선, 라운드 코너 (8px)
  - 버튼: 라운드 코너 (4px)

#### 4.1.7 상태 관리
- **장바구니 상태**: 
  - 추가된 메뉴 목록
  - 각 메뉴의 수량
  - 선택된 옵션
  - 총 금액
- **메뉴 데이터**: 
  - 백엔드 API에서 가져온 메뉴 목록
  - 각 메뉴의 옵션 정보

#### 4.1.8 API 연동
- **GET /api/menus**: 전체 메뉴 목록 조회
- **POST /api/orders**: 주문 생성
  - Request Body: 
    ```json
    {
      "items": [
        {
          "menuId": "string",
          "options": ["optionId1", "optionId2"],
          "quantity": number
        }
      ]
    }
    ```

### 4.2 관리자 화면

#### 4.2.1 화면 개요
관리자가 재고를 관리하고 주문 상태를 확인 및 업데이트할 수 있는 관리 화면

#### 4.2.2 레이아웃 구조

##### 상단 헤더
- **브랜드명**: "COZY" 로고 (좌측 정렬)
- **네비게이션 탭**:
  - "주문하기" 탭
  - "관리자" 탭 (활성 상태)
- 디자인: 헤더는 전체 너비를 차지하며, 테두리로 구분

##### 관리자 대시보드 섹션
- **위치**: 헤더 바로 아래, 최상단 배치
- **제목**: "관리자 대시보드"
- **통계 정보 표시**:
  - 총 주문: 전체 주문 수
  - 주문 접수: 접수 상태 주문 수
  - 제조 중: 제조 중 상태 주문 수
  - 제조 완료: 완료된 주문 수
- **레이아웃**: 가로로 나열, 구분자(/)로 구분
- **예시**: "총 주문 1 / 주문 접수 1 / 제조 중 0 / 제조 완료 0"
- **스타일**: 박스 형태, 배경 강조

##### 재고 현황 섹션
- **제목**: "재고 현황"
- **레이아웃**: 그리드 형태로 메뉴 카드 배치 (가로 3개씩 정렬)
- **재고 관리 카드 구성**:
  - 메뉴명: 메뉴 이름 표시 (예: "아메리카노 (ICE)")
  - 재고 수량: 현재 재고 수량 표시 (예: "10개")
  - 재고 조정 버튼:
    - [+] 버튼: 재고 증가
    - [-] 버튼: 재고 감소
  - 버튼은 수량 아래에 나란히 배치
- **스타일**: 테두리가 있는 카드 형태

##### 주문 현황 섹션
- **제목**: "주문 현황"
- **레이아웃**: 리스트 형태로 주문 항목 나열
- **주문 항목 구성**:
  - 주문 시간: 날짜 및 시간 표시 (예: "7월 31일 13:00")
  - 주문 내용: 메뉴명 x 수량 (예: "아메리카노(ICE) x 1")
  - 주문 금액: 총 금액 표시 (예: "4,000원")
  - 상태 변경 버튼: 현재 상태에 따라 다른 버튼 표시
    - "주문 접수" 버튼: 주문을 접수 상태로 변경
    - "제조 중" 버튼: 제조 중 상태로 변경
    - "제조 완료" 버튼: 완료 상태로 변경
- **레이아웃**: 각 항목은 가로로 정보 배치, 버튼은 우측 정렬
- **스타일**: 구분선으로 항목 구분

#### 4.2.3 UI 컴포넌트 명세

##### 1. 헤더 컴포넌트
```
컴포넌트명: Header
Props: 
  - currentTab: string (현재 활성 탭)
기능:
  - 브랜드명 표시
  - 탭 전환 기능 (주문하기 ↔ 관리자)
```

##### 2. 대시보드 컴포넌트
```
컴포넌트명: AdminDashboard
Props:
  - totalOrders: number (총 주문 수)
  - pendingOrders: number (주문 접수 수)
  - inProgressOrders: number (제조 중 수)
  - completedOrders: number (제조 완료 수)
기능:
  - 주문 상태별 통계 표시
  - 실시간 데이터 업데이트
```

##### 3. 재고 관리 카드 컴포넌트
```
컴포넌트명: InventoryCard
Props:
  - menuId: string
  - menuName: string
  - currentStock: number
  - onStockChange: function (재고 변경 콜백)
기능:
  - 현재 재고 수량 표시
  - [+] 버튼 클릭 시 재고 증가
  - [-] 버튼 클릭 시 재고 감소
  - 재고 변경 시 백엔드 API 호출
```

##### 4. 주문 항목 컴포넌트
```
컴포넌트명: OrderItem
Props:
  - orderId: string
  - orderTime: string (날짜 및 시간)
  - orderDetails: string (주문 내용)
  - totalPrice: number
  - currentStatus: string (현재 주문 상태)
  - onStatusChange: function (상태 변경 콜백)
기능:
  - 주문 정보 표시
  - 상태 변경 버튼 표시 (현재 상태에 따라)
  - 버튼 클릭 시 주문 상태 업데이트
```

##### 5. 주문 목록 컴포넌트
```
컴포넌트명: OrderList
Props:
  - orders: Array<Order>
  - onStatusChange: function
기능:
  - 주문 목록 표시
  - 각 주문의 상태 관리
  - 실시간 주문 목록 업데이트
```

#### 4.2.4 사용자 인터랙션

##### 재고 관리 플로우
1. 관리자가 재고 현황 섹션에서 특정 메뉴 확인
2. [+] 또는 [-] 버튼 클릭
3. 재고 수량이 즉시 업데이트됨
4. 백엔드 API로 변경사항 전송
5. 성공/실패 여부에 따라 UI 피드백 제공

##### 주문 상태 관리 플로우
1. 관리자가 주문 현황 섹션에서 주문 목록 확인
2. 특정 주문의 상태 변경 버튼 클릭 (예: "주문 접수")
3. 주문 상태가 다음 단계로 업데이트됨
4. 대시보드의 통계 정보가 자동으로 업데이트됨
5. 주문 항목의 버튼이 다음 상태 버튼으로 변경됨
   - 주문 접수 → 제조 중 → 제조 완료

##### 주문 상태 흐름
```
신규 주문 → 주문 접수 → 제조 중 → 제조 완료
```

#### 4.2.5 반응형 디자인
- **데스크톱**: 재고 관리 카드 3열 배치
- **태블릿**: 재고 관리 카드 2열 배치
- **모바일**: 재고 관리 카드 1열 배치, 주문 항목 정보 세로 배치

#### 4.2.6 스타일 가이드
- **색상**:
  - 대시보드 배경: 밝은 회색 또는 파스텔 톤
  - 통계 숫자: 강조 색상 (주요 지표)
  - 버튼 색상: 상태에 따라 다른 색상
    - 주문 접수: 파란색
    - 제조 중: 주황색
    - 제조 완료: 초록색
- **타이포그래피**:
  - 섹션 제목: 굵은 폰트, 중간 사이즈
  - 통계 정보: 중간 굵기, 적절한 강조
  - 메뉴명/주문 정보: 일반 폰트
- **간격**:
  - 섹션 간 여백: 32px
  - 카드 간 여백: 16px
  - 카드 내부 패딩: 16px
  - 주문 항목 간 여백: 12px
- **테두리**:
  - 대시보드: 1px 실선, 라운드 코너 (8px)
  - 재고 카드: 1px 실선, 라운드 코너 (8px)
  - 주문 항목: 하단 구분선

#### 4.2.7 상태 관리
- **대시보드 통계**: 
  - 각 상태별 주문 수
  - 총 주문 수
- **재고 데이터**: 
  - 각 메뉴의 현재 재고 수량
- **주문 목록**: 
  - 전체 주문 목록
  - 각 주문의 상태 정보
- **실시간 업데이트**: 
  - 폴링 또는 웹소켓을 통한 실시간 데이터 동기화

#### 4.2.8 API 연동
- **GET /api/admin/dashboard**: 대시보드 통계 조회
  - Response:
    ```json
    {
      "totalOrders": number,
      "pendingOrders": number,
      "inProgressOrders": number,
      "completedOrders": number
    }
    ```

- **GET /api/admin/inventory**: 재고 현황 조회
  - Response:
    ```json
    [
      {
        "menuId": "string",
        "menuName": "string",
        "currentStock": number
      }
    ]
    ```

- **PATCH /api/admin/inventory/:menuId**: 재고 수량 업데이트
  - Request Body:
    ```json
    {
      "stockChange": number (+ 또는 - 값)
    }
    ```

- **GET /api/admin/orders**: 전체 주문 목록 조회
  - Response:
    ```json
    [
      {
        "orderId": "string",
        "orderTime": "string",
        "items": [
          {
            "menuName": "string",
            "quantity": number
          }
        ],
        "totalPrice": number,
        "status": "pending" | "in_progress" | "completed"
      }
    ]
    ```

- **PATCH /api/admin/orders/:orderId/status**: 주문 상태 업데이트
  - Request Body:
    ```json
    {
      "status": "pending" | "in_progress" | "completed"
    }
    ```

#### 4.2.9 추가 기능 고려사항
- **알림 기능**: 신규 주문 발생 시 관리자에게 알림
- **필터링**: 주문 상태별 필터링 기능
- **검색**: 날짜별, 메뉴별 주문 검색
- **재고 경고**: 재고가 임계값 이하로 떨어질 때 경고 표시
- **주문 상세**: 주문 항목 클릭 시 상세 정보 모달 표시

## 5. 백엔드 개발 명세

### 5.1 데이터베이스 설계

#### 5.1.1 데이터 모델

##### 1. Menus (메뉴 테이블)
메뉴 정보를 저장하는 테이블

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | 메뉴 고유 ID |
| name | VARCHAR(100) | NOT NULL | 커피 이름 |
| description | TEXT | | 메뉴 설명 |
| price | INTEGER | NOT NULL | 가격 (원) |
| image_url | VARCHAR(255) | | 이미지 URL |
| stock_quantity | INTEGER | NOT NULL, DEFAULT 0 | 재고 수량 |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 생성 일시 |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 수정 일시 |

**예시 데이터**:
```json
{
  "id": 1,
  "name": "아메리카노(ICE)",
  "description": "시원한 아이스 아메리카노",
  "price": 4000,
  "image_url": "/images/americano-ice.jpg",
  "stock_quantity": 10,
  "created_at": "2025-07-31T09:00:00Z",
  "updated_at": "2025-07-31T09:00:00Z"
}
```

##### 2. Options (옵션 테이블)
메뉴에 추가할 수 있는 옵션 정보를 저장하는 테이블

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | 옵션 고유 ID |
| menu_id | INTEGER | FOREIGN KEY (Menus.id) | 연결된 메뉴 ID |
| name | VARCHAR(50) | NOT NULL | 옵션 이름 |
| price | INTEGER | NOT NULL, DEFAULT 0 | 옵션 추가 가격 (원) |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 생성 일시 |

**예시 데이터**:
```json
{
  "id": 1,
  "menu_id": 1,
  "name": "샷 추가",
  "price": 500,
  "created_at": "2025-07-31T09:00:00Z"
}
```

##### 3. Orders (주문 테이블)
주문 정보를 저장하는 테이블

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | 주문 고유 ID |
| order_time | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 주문 일시 |
| total_price | INTEGER | NOT NULL | 총 주문 금액 (원) |
| status | ENUM | NOT NULL, DEFAULT 'pending' | 주문 상태 (pending, in_progress, completed) |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 생성 일시 |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 수정 일시 |

**예시 데이터**:
```json
{
  "id": 1,
  "order_time": "2025-07-31T13:00:00Z",
  "total_price": 12500,
  "status": "pending",
  "created_at": "2025-07-31T13:00:00Z",
  "updated_at": "2025-07-31T13:00:00Z"
}
```

##### 4. OrderItems (주문 항목 테이블)
각 주문의 상세 항목을 저장하는 테이블

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | 주문 항목 고유 ID |
| order_id | INTEGER | FOREIGN KEY (Orders.id) ON DELETE CASCADE | 주문 ID |
| menu_id | INTEGER | FOREIGN KEY (Menus.id) | 메뉴 ID |
| menu_name | VARCHAR(100) | NOT NULL | 주문 당시 메뉴명 (스냅샷) |
| quantity | INTEGER | NOT NULL | 수량 |
| unit_price | INTEGER | NOT NULL | 단가 (원) |
| subtotal | INTEGER | NOT NULL | 소계 (원) |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 생성 일시 |

**예시 데이터**:
```json
{
  "id": 1,
  "order_id": 1,
  "menu_id": 1,
  "menu_name": "아메리카노(ICE)",
  "quantity": 1,
  "unit_price": 4500,
  "subtotal": 4500,
  "created_at": "2025-07-31T13:00:00Z"
}
```

##### 5. OrderItemOptions (주문 항목 옵션 테이블)
각 주문 항목에 추가된 옵션 정보를 저장하는 테이블

| 필드명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT | 주문 항목 옵션 고유 ID |
| order_item_id | INTEGER | FOREIGN KEY (OrderItems.id) ON DELETE CASCADE | 주문 항목 ID |
| option_id | INTEGER | FOREIGN KEY (Options.id) | 옵션 ID |
| option_name | VARCHAR(50) | NOT NULL | 옵션명 (스냅샷) |
| option_price | INTEGER | NOT NULL | 옵션 가격 (스냅샷) |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 생성 일시 |

**예시 데이터**:
```json
{
  "id": 1,
  "order_item_id": 1,
  "option_id": 1,
  "option_name": "샷 추가",
  "option_price": 500,
  "created_at": "2025-07-31T13:00:00Z"
}
```

#### 5.1.2 ERD (Entity Relationship Diagram)

```
┌─────────────────┐
│     Menus       │
├─────────────────┤
│ PK id           │
│    name         │
│    description  │
│    price        │
│    image_url    │
│    stock_quantity│
│    created_at   │
│    updated_at   │
└────────┬────────┘
         │ 1
         │
         │ N
┌────────┴────────┐
│    Options      │
├─────────────────┤
│ PK id           │
│ FK menu_id      │
│    name         │
│    price        │
│    created_at   │
└─────────────────┘

┌─────────────────┐         ┌──────────────────┐
│     Orders      │ 1     N │   OrderItems     │
├─────────────────┤─────────├──────────────────┤
│ PK id           │         │ PK id            │
│    order_time   │         │ FK order_id      │
│    total_price  │         │ FK menu_id       │
│    status       │         │    menu_name     │
│    created_at   │         │    quantity      │
│    updated_at   │         │    unit_price    │
└─────────────────┘         │    subtotal      │
                            │    created_at    │
                            └────────┬─────────┘
                                     │ 1
                                     │
                                     │ N
                            ┌────────┴─────────┐
                            │OrderItemOptions  │
                            ├──────────────────┤
                            │ PK id            │
                            │ FK order_item_id │
                            │ FK option_id     │
                            │    option_name   │
                            │    option_price  │
                            │    created_at    │
                            └──────────────────┘
```

### 5.2 사용자 흐름 및 데이터 처리

#### 5.2.1 메뉴 조회 및 표시 흐름
1. 사용자가 "주문하기" 화면에 접근
2. 프런트엔드가 `GET /api/menus` API 호출
3. 백엔드가 Menus 테이블에서 모든 메뉴 정보 조회
4. 각 메뉴와 연결된 Options 정보도 함께 조회 (JOIN)
5. 메뉴 목록과 옵션 정보를 프런트엔드에 응답
6. 프런트엔드가 받은 데이터로 메뉴 카드를 화면에 렌더링
7. **재고 수량(stock_quantity)은 관리자 화면에서만 표시**

#### 5.2.2 주문 생성 흐름
1. 사용자가 메뉴를 선택하고 옵션을 추가
2. 선택한 메뉴와 옵션이 장바구니에 표시됨
3. 사용자가 "주문하기" 버튼 클릭
4. 프런트엔드가 `POST /api/orders` API 호출하며 주문 데이터 전송
5. **백엔드 트랜잭션 시작**
   - Orders 테이블에 새 주문 레코드 생성 (status: 'pending')
   - 각 주문 항목에 대해:
     - OrderItems 테이블에 항목 추가
     - 선택된 옵션이 있다면 OrderItemOptions 테이블에 추가
     - **Menus 테이블의 해당 메뉴 재고 수량 감소** (stock_quantity - quantity)
     - 재고가 부족하면 롤백 및 에러 응답
   - 총 금액 계산 및 Orders.total_price 업데이트
6. **트랜잭션 커밋**
7. 생성된 주문 ID와 성공 메시지 응답
8. 프런트엔드가 장바구니 초기화

#### 5.2.3 주문 현황 조회 흐름 (관리자)
1. 관리자가 "관리자" 화면에 접근
2. 프런트엔드가 `GET /api/admin/orders` API 호출
3. 백엔드가 Orders, OrderItems, OrderItemOptions 테이블 조인하여 전체 주문 목록 조회
4. 주문 상태별로 그룹화하여 응답
5. 프런트엔드가 "주문 현황" 섹션에 표시

#### 5.2.4 주문 상태 변경 흐름 (관리자)
1. 관리자가 주문의 상태 변경 버튼 클릭 (예: "제조 시작")
2. 프런트엔드가 `PATCH /api/admin/orders/:orderId/status` API 호출
3. 백엔드가 해당 주문의 status 필드 업데이트
   - pending → in_progress → completed
4. 업데이트된 주문 정보 응답
5. 프런트엔드가 UI 업데이트 및 대시보드 통계 재계산

#### 5.2.5 재고 관리 흐름 (관리자)
1. 관리자가 "재고 현황" 섹션에서 재고 조정 버튼 클릭
2. 프런트엔드가 `PATCH /api/admin/inventory/:menuId` API 호출
3. 백엔드가 Menus 테이블의 stock_quantity 업데이트
4. 업데이트된 재고 정보 응답
5. 프런트엔드가 화면에 새로운 재고 수량 표시

### 5.3 API 명세

#### 5.3.1 메뉴 관련 API

##### GET /api/menus
전체 메뉴 목록과 옵션 정보를 조회합니다.

**Request**
```
GET /api/menus
```

**Response (200 OK)**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "아메리카노(ICE)",
      "description": "시원한 아이스 아메리카노",
      "price": 4000,
      "imageUrl": "/images/americano-ice.jpg",
      "options": [
        {
          "id": 1,
          "name": "샷 추가",
          "price": 500
        },
        {
          "id": 2,
          "name": "시럽 추가",
          "price": 0
        }
      ]
    },
    {
      "id": 2,
      "name": "카페라떼",
      "description": "부드러운 우유와 에스프레소",
      "price": 5000,
      "imageUrl": "/images/caffe-latte.jpg",
      "options": [
        {
          "id": 1,
          "name": "샷 추가",
          "price": 500
        }
      ]
    }
  ]
}
```

**Error Response (500)**
```json
{
  "success": false,
  "error": "메뉴 목록을 불러오는 중 오류가 발생했습니다."
}
```

##### GET /api/menus/:menuId
특정 메뉴의 상세 정보를 조회합니다.

**Request**
```
GET /api/menus/1
```

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "아메리카노(ICE)",
    "description": "시원한 아이스 아메리카노",
    "price": 4000,
    "imageUrl": "/images/americano-ice.jpg",
    "options": [
      {
        "id": 1,
        "name": "샷 추가",
        "price": 500
      }
    ]
  }
}
```

**Error Response (404)**
```json
{
  "success": false,
  "error": "메뉴를 찾을 수 없습니다."
}
```

#### 5.3.2 주문 관련 API

##### POST /api/orders
새로운 주문을 생성합니다. 주문과 동시에 재고가 차감됩니다.

**Request**
```json
POST /api/orders
Content-Type: application/json

{
  "items": [
    {
      "menuId": 1,
      "menuName": "아메리카노(ICE)",
      "quantity": 1,
      "options": [
        {
          "optionId": 1,
          "optionName": "샷 추가",
          "optionPrice": 500
        }
      ]
    },
    {
      "menuId": 2,
      "menuName": "카페라떼",
      "quantity": 2,
      "options": []
    }
  ]
}
```

**Response (201 Created)**
```json
{
  "success": true,
  "data": {
    "orderId": 1,
    "orderTime": "2025-07-31T13:00:00Z",
    "totalPrice": 14500,
    "status": "pending",
    "items": [
      {
        "menuName": "아메리카노(ICE)",
        "quantity": 1,
        "options": ["샷 추가"],
        "subtotal": 4500
      },
      {
        "menuName": "카페라떼",
        "quantity": 2,
        "options": [],
        "subtotal": 10000
      }
    ]
  },
  "message": "주문이 접수되었습니다."
}
```

**Error Response (400 - 재고 부족)**
```json
{
  "success": false,
  "error": "재고가 부족합니다.",
  "details": {
    "menuName": "아메리카노(ICE)",
    "requestedQuantity": 5,
    "availableStock": 3
  }
}
```

**Error Response (400 - 유효성 검사 실패)**
```json
{
  "success": false,
  "error": "주문 항목이 비어있습니다."
}
```

##### GET /api/orders/:orderId
특정 주문의 상세 정보를 조회합니다.

**Request**
```
GET /api/orders/1
```

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "orderTime": "2025-07-31T13:00:00Z",
    "totalPrice": 14500,
    "status": "pending",
    "items": [
      {
        "menuName": "아메리카노(ICE)",
        "quantity": 1,
        "unitPrice": 4500,
        "subtotal": 4500,
        "options": [
          {
            "name": "샷 추가",
            "price": 500
          }
        ]
      },
      {
        "menuName": "카페라떼",
        "quantity": 2,
        "unitPrice": 5000,
        "subtotal": 10000,
        "options": []
      }
    ]
  }
}
```

**Error Response (404)**
```json
{
  "success": false,
  "error": "주문을 찾을 수 없습니다."
}
```

#### 5.3.3 관리자 API

##### GET /api/admin/dashboard
관리자 대시보드 통계 정보를 조회합니다.

**Request**
```
GET /api/admin/dashboard
```

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "totalOrders": 10,
    "pendingOrders": 3,
    "inProgressOrders": 2,
    "completedOrders": 5
  }
}
```

##### GET /api/admin/inventory
전체 메뉴의 재고 현황을 조회합니다.

**Request**
```
GET /api/admin/inventory
```

**Response (200 OK)**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "아메리카노(ICE)",
      "currentStock": 10
    },
    {
      "id": 2,
      "name": "아메리카노(HOT)",
      "currentStock": 3
    },
    {
      "id": 3,
      "name": "카페라떼",
      "currentStock": 0
    }
  ]
}
```

##### PATCH /api/admin/inventory/:menuId
특정 메뉴의 재고 수량을 조정합니다.

**Request**
```json
PATCH /api/admin/inventory/1
Content-Type: application/json

{
  "stockChange": 5
}
```
*stockChange는 양수(증가) 또는 음수(감소) 값*

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "아메리카노(ICE)",
    "currentStock": 15,
    "previousStock": 10
  },
  "message": "재고가 업데이트되었습니다."
}
```

**Error Response (400 - 재고 음수 불가)**
```json
{
  "success": false,
  "error": "재고는 0 미만이 될 수 없습니다.",
  "details": {
    "currentStock": 3,
    "requestedChange": -5
  }
}
```

##### GET /api/admin/orders
전체 주문 목록을 조회합니다.

**Request**
```
GET /api/admin/orders?status=pending
```
*Query Parameters (선택사항):*
- `status`: pending, in_progress, completed

**Response (200 OK)**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "orderTime": "2025-07-31T13:00:00Z",
      "totalPrice": 14500,
      "status": "pending",
      "items": [
        {
          "menuName": "아메리카노(ICE)",
          "quantity": 1,
          "options": ["샷 추가"]
        }
      ]
    }
  ]
}
```

##### PATCH /api/admin/orders/:orderId/status
주문의 상태를 변경합니다.

**Request**
```json
PATCH /api/admin/orders/1/status
Content-Type: application/json

{
  "status": "in_progress"
}
```
*status 값: "pending", "in_progress", "completed"*

**Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "in_progress",
    "updatedAt": "2025-07-31T13:05:00Z"
  },
  "message": "주문 상태가 업데이트되었습니다."
}
```

**Error Response (400 - 잘못된 상태 전환)**
```json
{
  "success": false,
  "error": "잘못된 상태 전환입니다.",
  "details": {
    "currentStatus": "completed",
    "requestedStatus": "pending"
  }
}
```

### 5.4 에러 처리

#### 5.4.1 HTTP 상태 코드
- `200 OK`: 요청 성공
- `201 Created`: 리소스 생성 성공
- `400 Bad Request`: 잘못된 요청 (유효성 검사 실패, 재고 부족 등)
- `404 Not Found`: 리소스를 찾을 수 없음
- `500 Internal Server Error`: 서버 내부 오류

#### 5.4.2 에러 응답 형식
모든 에러 응답은 다음 형식을 따릅니다:

```json
{
  "success": false,
  "error": "에러 메시지",
  "details": {
    "추가정보": "값"
  }
}
```

### 5.5 보안 고려사항

#### 5.5.1 입력 유효성 검사
- 모든 API 요청 데이터에 대한 유효성 검사 수행
- SQL Injection 방지를 위한 Prepared Statement 사용
- XSS 방지를 위한 입력 데이터 이스케이프 처리

#### 5.5.2 관리자 API 보호
- 추후 인증/인가 시스템 추가 필요
- 관리자 API는 `/api/admin` 경로로 구분
- 프로덕션 환경에서는 JWT 또는 세션 기반 인증 적용 권장

### 5.6 성능 최적화

#### 5.6.1 데이터베이스 인덱스
- `Menus.id`: PRIMARY KEY (자동 인덱스)
- `Options.menu_id`: FOREIGN KEY (인덱스 권장)
- `Orders.status`: 상태별 조회 최적화를 위한 인덱스
- `Orders.order_time`: 날짜별 조회를 위한 인덱스
- `OrderItems.order_id`: FOREIGN KEY (인덱스 권장)

#### 5.6.2 쿼리 최적화
- 메뉴 목록 조회 시 JOIN을 사용하여 N+1 문제 방지
- 주문 목록 조회 시 필요한 컬럼만 SELECT
- 트랜잭션 범위 최소화

### 5.7 개발 우선순위

#### Phase 1: 기본 기능 (MVP)
1. 메뉴 조회 API (`GET /api/menus`)
2. 주문 생성 API (`POST /api/orders`)
3. 주문 조회 API (`GET /api/orders/:orderId`)
4. 재고 차감 로직

#### Phase 2: 관리자 기능
1. 대시보드 통계 API (`GET /api/admin/dashboard`)
2. 재고 관리 API (`GET /api/admin/inventory`, `PATCH /api/admin/inventory/:menuId`)
3. 주문 목록 조회 API (`GET /api/admin/orders`)
4. 주문 상태 변경 API (`PATCH /api/admin/orders/:orderId/status`)

#### Phase 3: 개선 사항
1. 에러 처리 강화
2. 로깅 시스템 구축
3. API 문서 자동화 (Swagger)
4. 단위 테스트 및 통합 테스트