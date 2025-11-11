import type { Metadata } from 'next'
import { Geist, Geist_Mono, Poppins } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar/sidebar-trigger'
import { cn } from '@/lib/utils'
import './globals.css'
import { QueryProvider } from '@/lib/query-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Data Table - Advanced Product Management',
  description:
    'A powerful data table component library with sorting, pagination, filtering, and column pinning. Built with Next.js, TanStack Table, and TypeScript.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'antialiased overflow-hidden',
          geistSans.variable,
          geistMono.variable,
          poppins.variable
        )}
      >
        <div className='h-screen w-screen flex flex-col overflow-hidden'>
          <Header />
          <div className='flex flex-1 overflow-hidden'>
            <Sidebar />
            <main className='flex-1 overflow-auto p-6 lg:p-8'>
              <QueryProvider>
                <NuqsAdapter>{children}</NuqsAdapter>
              </QueryProvider>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
