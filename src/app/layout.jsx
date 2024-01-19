import '@/styles/globals.css'

import { Inter } from 'next/font/google'
import { ContextProvider } from '@/context/modalContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Link-Shortener',
  description: 'Generated a short URL',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ContextProvider>{children}</ContextProvider>
        </body>
    </html>
  )
}
