'use client'
import { 
  useAppThemeContext
} from '@/shared/contexts/Theme/ThemeContext'
import { Button } from '@mui/material'

export default function Dashboard() {
  const { toggleTheme } = useAppThemeContext()

  return (
    <>
      <h1>Dashboard</h1>
      <Button
        variant='contained'
        color='primary'
        onClick={toggleTheme}
      >
        Clique aqui
      </Button>
    </>
  )
}