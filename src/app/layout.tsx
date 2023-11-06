import type { Metadata } from 'next'
import '../styles/globals.css'
import { AppThemeProvider 
} from '@/shared/contexts/Theme/ThemeContext'

export const metadata: Metadata = {
  title: 'Cadastros',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="pt-br">
      <AppThemeProvider>
        {children}
      </AppThemeProvider>
    </html>
  )
}
