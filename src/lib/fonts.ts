import { Fraunces, Inter } from 'next/font/google'

export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  // Optical sizing keeps large headline rendering refined
  axes: ['opsz', 'SOFT', 'WONK'],
})

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
