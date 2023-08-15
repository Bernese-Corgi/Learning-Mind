import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Learning Tool',
  description: '백엔드 공부 하려고 만든 앱',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <script src="/script/devtools.js" async></script>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
