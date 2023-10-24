'use client'
import { DarkTheme } from '@/shared/themes/dark'
import { LightTheme } from '@/shared/themes/light'
import { ThemeProvider } from '@emotion/react'
import { Box } from '@mui/material'
import { Inter } from 'next/font/google'
import React, { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

interface IThemeContextData {
    themeName: 'light' | 'dark'
    toggleTheme: () => void
}

const ThemeContext = createContext({} as IThemeContextData)

export const useAppThemeContext = () => {
  return useContext(ThemeContext)
}

export interface IChildrenProp {
    children: ReactNode
}

export const AppThemeProvider = ({ children }: IChildrenProp): JSX.Element => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light')
    
  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light')
  }, [])

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme

    return DarkTheme
  }, [themeName])

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <body className={inter.className}>
          <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
            {children}
          </Box>
        </body>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}