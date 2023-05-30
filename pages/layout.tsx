import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'Markets App',
  description: 'Watch Global Stock Market Data, Commodities, Gold, Oil, Forex, Crypto with real-time data.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
