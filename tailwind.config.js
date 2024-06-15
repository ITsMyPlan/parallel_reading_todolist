/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yw-100': '#F0B646',
        'yw-50': '#FFdb6b',
        'og-100': '#EF903F',
        'og-50': '#EF903F/50',
        'rd-100': '#E85011',
        'rd-50': '#E85011/50',
        'bl-100': '#69C0BA',
        'bl-50': '#69C0BA/50'
      }
    },
  },
  plugins: [],
}

