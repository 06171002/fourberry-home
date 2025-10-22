/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './components/**/*.vue',
  ],
  theme: {
    extend: {
        colors: {
        /*  브랜드 컬러 */
        primary: '#003da5',     // 메인 블루(로고)
        secondary: '#0084d5',   // 보조 블루(로고)
        accent: '#071e2e',      // 다크 블루 포인트

        /*  중립톤 */
        background: '#ffffff',  // 전체 배경
        surface: '#f9fafb',     // 섹션·카드 배경
        border: '#e5e7eb',      // 구분선
        text: '#111827',        // 기본 본문 텍스트
        subtext: '#6b7280',     // 서브 텍스트
        muted: '#9ca3af',       // 비활성, 힌트 텍스트

        /*  Gray 명조  */
        gray: {
          light: '#f3f4f6',   // 배경용 (surface보다 살짝 진함)
          mid: '#9ca3af',     // 일반 텍스트, 아이콘용
          dark: '#374151',    // 제목, 강조 텍스트
          deep: '#111827',    // 거의 블랙 (헤드라인)
        },
      fontFamily: {
        sans: ['Pretendard','Noto Sans KR','system-ui','sans-serif'],
      },
      borderRadius: { '2xl': '1rem' },
    },
  },
  plugins: [],
}


}