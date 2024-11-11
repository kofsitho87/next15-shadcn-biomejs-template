# Admin Web

관리자 웹 애플리케이션입니다.

## 기술 스택

- Next.js 14.2.3
- React
- TypeScript
- TanStack Query
- Tanstack Table
- React Hook Form
- Zod
- Tailwind CSS
- Shadcn UI
- Supabase

## 주요 기능

- 대시보드
  - 통계 데이터 시각화
  - 사용자/피드 일별 추이 확인
- 사용자 관리
- 피드 관리
- 실시간 화상 통화 관리 (LiveKit)
- AI 튜터 관리

## 개발 환경 설정

1. 필수 요구사항
   - Node.js 20.9.0
   - Pnpm

2. 설치
   ```bash
   # 의존성 설치
   Pnpm install
   ```

3. 환경 변수 설정
   ```bash
   # .env.local 파일 생성
   cp .env.example .env.local
   ```
   `.env.local` 파일을 열어 필요한 환경 변수를 설정합니다:
   - `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase 익명 키
   - `LIVEKIT_API_KEY`: LiveKit API 키
   - `LIVEKIT_API_SECRET`: LiveKit API 시크릿

4. 개발 서버 실행
   ```bash
   yarn dev
   ```
   http://localhost:3000 에서 애플리케이션에 접속할 수 있습니다.

## 배포

1. 프로덕션 빌드
   ```bash
   yarn build
   ```

2. 프로덕션 서버 실행
   ```bash
   yarn start
   ```

## 커밋 메세지 작성 방법

1. 커서의 composer를 열고 git diff 를 입력합니다.
2. 커밋 메세지를 작성합니다.
3. 예시
   ```
   feat: Job 관리 기능 및 인증 컴포넌트 구현
   - Job 상세 보기 및 목록 뷰 컴포넌트 추가
   - Job 폼 구현 (스키마, 디버그, 비즈니스 선택 기능)
   - 인증 관련 컴포넌트 및 세션 처리 로직 구현
   - 앱 사이드바 레이아웃 업데이트
   ```