import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'

export const metadata: Metadata = {
  title: 'hookmah',
  description: 'Hokmah ai platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem >
        {children}
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
    </>
  )
}
