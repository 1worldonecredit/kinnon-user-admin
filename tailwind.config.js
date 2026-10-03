/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 🌟 บรรทัดนี้สำคัญมาก ห้ามขาด
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}