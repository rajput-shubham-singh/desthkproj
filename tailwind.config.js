/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F5F2EB', // Warm cream/paper canvas
        ink: {
          DEFAULT: '#18181B',
          50: '#71717A',
          100: '#52525B',
          200: '#3F3F46',
          900: '#18181B',
        },
        terracotta: {
          DEFAULT: '#E05A47', // Terracotta Coral
          50: '#FDF3F1',
          100: '#FCE7E4',
          500: '#E05A47',
          600: '#D04936',
          hover: '#D04936',
        },
        mustard: {
          DEFAULT: '#F59E0B', // Warm Mustard / Amber
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
        },
        forest: {
          DEFAULT: '#15803D', // Deep Forest Green
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          500: '#15803D',
          600: '#166534',
        },
        paper: '#FFFFFF',
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderWidth: {
        '1.5': '1.5px',
      },
      boxShadow: {
        'ink-xs': '1.5px 1.5px 0px #18181B',
        'ink-sm': '2px 2px 0px #18181B',
        'ink': '3px 3px 0px #18181B',
        'ink-md': '4px 4px 0px #18181B',
        'ink-lg': '6px 6px 0px #18181B',
      }
    },
  },
  plugins: [],
};
