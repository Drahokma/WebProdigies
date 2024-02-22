import { DM_Sans, } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { Metadata } from 'next'
import ModalProvider from '@/providers/modal-provider'
import { Toaster } from '@/components/ui/toaster'

const font = DM_Sans ({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Plura',
  description: 'Run your agency in one place',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html 
        lang="en"
        suppressHydrationWarning  
      >
        <body className={font.className}>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ModalProvider> 
                {children}
                <Toaster />
              </ModalProvider>
          </ThemeProvider>
        </body>
      </html>
  )
}