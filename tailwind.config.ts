import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        fraunces: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        purple: {
          50: '#f5f0f5',
          100: '#ecdce9',
          200: '#d9b9d4',
          300: '#c492bb',
          400: '#ac6b9e',
          500: '#8d4882',
          600: '#6e3366',
          700: '#552750',
          800: '#3e1b3b',
          900: '#2d1229',
          // DEFAULT uses CSS variable to support opacity modifiers like bg-purple/10
          DEFAULT: 'rgb(var(--color-purple) / <alpha-value>)',
          foreground: '#ffffff',
        },
        gold: {
          50: '#fdf8ec',
          100: '#fbefd0',
          200: '#f6dda0',
          300: '#f0c668',
          400: '#e9ad38',
          500: '#c9922a',
          600: '#a87421',
          700: '#865a1c',
          800: '#6b4518',
          900: '#573717',
          DEFAULT: 'rgb(var(--color-gold) / <alpha-value>)',
          foreground: '#1a1108',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            color: 'hsl(var(--foreground))',
            a: {
              color: '#C9A84C',
              '&:hover': { color: '#4A1942' },
            },
            h1: { fontFamily: 'var(--font-fraunces)' },
            h2: { fontFamily: 'var(--font-fraunces)' },
            h3: { fontFamily: 'var(--font-fraunces)' },
          },
        },
      },
    },
  },
  plugins: [animate],
}

export default config
