/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        vault: {
          bg: '#0a0e17',
          surface: '#111827',
          border: '#1f2937',
          accent: '#00d4aa',
          accent2: '#0ea5e9',
          danger: '#ef4444',
          warn: '#f59e0b',
          text: '#e2e8f0',
          muted: '#64748b',
        }
      }
    }
  },
  plugins: []
}
