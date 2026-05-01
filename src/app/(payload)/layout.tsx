import React from 'react'
import { importMap } from './admin/importMap.js'

type Args = {
  children: React.ReactNode
}

export default async function RootLayout({ children }: Args) {
  return (
    <html>
      <body>
        <React.StrictMode>{children}</React.StrictMode>
      </body>
    </html>
  )
}
