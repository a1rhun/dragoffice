# Next.js 쇼핑몰 구현 가이드

## 목차
1. [아키텍처 개요](#아키텍처-개요)
2. [도메인 설정](#도메인-설정)
3. [데이터베이스](#데이터베이스)
4. [백엔드 구조](#백엔드-구조)
5. [결제 연동](#결제-연동)
6. [추천 스택 요약](#추천-스택-요약)
7. [시작 순서](#시작-순서)

---

## 아키텍처 개요

```
[사용자] → [Next.js App (Vercel)] → [API Routes / Server Actions]
                                          ↓
                                    [PostgreSQL (DB)]
                                    [Redis (캐시/세션)]
                                    [S3 (이미지)]
```

---

## 도메인 설정

### 설정 순서

```
도메인 구매 → Cloudflare DNS 등록 → Vercel 커스텀 도메인 추가
```

### 각 단계 설명

| 단계 | 서비스 | 설명 |
|------|--------|------|
| 도메인 구매 | 가비아, Namecheap, GoDaddy | 원하는 도메인 구매 |
| DNS 관리 | Cloudflare (무료) | 성능/보안 우수, CDN 포함 |
| 배포 & SSL | Vercel | 커스텀 도메인 연결 시 SSL 자동 발급 |

---

## 데이터베이스

### 기술 선택

| 용도 | 추천 | 이유 |
|------|------|------|
| 메인 DB | PostgreSQL (Supabase / Neon) | 무료 티어, Next.js 궁합 최고 |
| ORM | Prisma | 타입 안전, 마이그레이션 편리 |
| 캐시 | Upstash Redis | 서버리스 Redis, 무료 티어 |
| 이미지 저장 | Cloudflare R2 / AWS S3 | 상품 이미지 저장 |

### Prisma 스키마 예시

```prisma
model Product {
  id        String      @id @default(cuid())
  name      String
  price     Int
  stock     Int
  images    String[]
  orders    OrderItem[]
}

model Order {
  id          String      @id @default(cuid())
  userId      String
  status      OrderStatus @default(PENDING)
  totalAmount Int
  items       OrderItem[]
  createdAt   DateTime    @default(now())
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  productId String
  quantity  Int
  price     Int
  order     Order   @relation(fields: [orderId], references: [id])
  product   Product @relation(fields: [productId], references: [id])
}

enum OrderStatus {
  PENDING
  PAID
  SHIPPING
  DELIVERED
  CANCELLED
}
```

---

## 백엔드 구조

Next.js App Router 기준 디렉토리 구조:

```
app/
├── api/
│   ├── products/route.ts          # 상품 CRUD
│   ├── orders/route.ts            # 주문 처리
│   ├── payments/
│   │   ├── route.ts               # 결제 요청 및 승인
│   │   └── webhook/route.ts       # 결제 완료 콜백
│   └── auth/[...nextauth]/        # 인증 (NextAuth.js)
├── (shop)/
│   ├── products/[id]/page.tsx     # 상품 상세
│   └── checkout/page.tsx          # 결제 페이지
└── (admin)/
    └── dashboard/page.tsx         # 관리자 대시보드
```

### 인증

- **NextAuth.js v5** 사용
- 소셜 로그인 (Google, Kakao 등) + 이메일 로그인 지원

---

## 결제 연동

### 국내 PG사 비교

| 서비스 | 특징 | 추천도 |
|--------|------|--------|
| **토스페이먼츠** | 개발자 경험 최고, 문서 친절 | ★★★ (추천) |
| 포트원 (구 아임포트) | 여러 PG사 통합, 레거시 많음 | ★★☆ |
| 카카오페이 | 간편결제 특화 | ★★☆ |

### 토스페이먼츠 결제 흐름

```
1. 프론트: 결제 위젯 렌더링
2. 사용자: 결제 수단 선택 및 승인
3. 프론트 → 백엔드: 결제 승인 요청 (orderId, amount, paymentKey)
4. 백엔드 → 토스 API: 최종 승인
5. 토스 → 백엔드 Webhook: 결제 완료 알림
6. DB 업데이트: 주문 상태 변경
```

### 결제 승인 API 구현 예시

```typescript
// app/api/payments/route.ts
export async function POST(req: Request) {
  const { paymentKey, orderId, amount } = await req.json()

  // 1. DB에서 주문 금액 검증 (필수! 위변조 방지)
  const order = await prisma.order.findUnique({ where: { id: orderId } })
  if (!order || order.totalAmount !== amount) {
    return Response.json({ error: '금액 불일치' }, { status: 400 })
  }

  // 2. 토스 승인 API 호출
  const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64')}`,
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  })

  if (!response.ok) {
    return Response.json({ error: '결제 승인 실패' }, { status: 500 })
  }

  // 3. DB 주문 상태 업데이트
  await prisma.order.update({
    where: { id: orderId },
    data: { status: 'PAID' },
  })

  return Response.json({ success: true })
}
```

> **보안 주의**: 결제 금액은 반드시 서버에서 DB 값과 대조 검증해야 합니다. 프론트에서 넘어온 금액을 그대로 신뢰하면 안 됩니다.

---

## 추천 스택 요약

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 15 (App Router) |
| 배포 | Vercel |
| 데이터베이스 | Neon PostgreSQL |
| ORM | Prisma |
| 인증 | NextAuth.js v5 |
| 결제 | 토스페이먼츠 |
| 이미지 저장 | Cloudflare R2 |
| 캐시 | Upstash Redis |
| 도메인 | 가비아 구매 → Cloudflare DNS → Vercel 연결 |

---

## 시작 순서

1. **프로젝트 생성**
   ```bash
   npx create-next-app@latest my-shop --typescript --tailwind --app
   ```

2. **Neon DB + Prisma 연결**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

3. **NextAuth 인증 구현**
   ```bash
   npm install next-auth@beta
   ```

4. **상품 / 주문 API 구현**
   - `app/api/products/route.ts`
   - `app/api/orders/route.ts`

5. **토스페이먼츠 테스트 모드로 결제 연동**
   - 토스페이먼츠 개발자센터에서 테스트 키 발급
   - `@tosspayments/tosspayments-js` 설치

6. **Vercel 배포 + 도메인 연결**
   ```bash
   npm install -g vercel
   vercel
   ```

7. **실결제 전환**
   - 토스페이먼츠 사업자 심사 통과 후 라이브 키로 교체
