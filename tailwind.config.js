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
        primary: '#2563eb',
        accent:  '#93c5fd',
        neutral: '#f3f4f6',
      },
      fontFamily: {
        sans: ['Pretendard','Inter','system-ui','sans-serif'],
      },
      borderRadius: { '2xl': '1rem' },
    },
  },
  plugins: [],
}
