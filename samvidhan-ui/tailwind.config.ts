import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#94ABE8',
          light: '#A8BBEC',
          dark: '#7A8FD4',
        },
        secondary: '#1F2937',
        accent: '#3B82F6',
        destructive: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B',
        muted: {
          DEFAULT: '#F3F4F6',
          foreground: '#6B7280',
        },
        background: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
      boxShadow: {
        '3d': '0 10px 30px rgba(148, 171, 232, 0.25)',
        '3d-hover': '0 15px 40px rgba(148, 171, 232, 0.35)',
      },
    },
  },
  plugins: [],
}

export default config
