'use client'
import { 
  useAppThemeContext
} from '@/shared/contexts/Theme/ThemeContext'
import { Box, Button } from '@mui/material'

export default function Dashboard() {
  const { toggleTheme } = useAppThemeContext()

  return (
    <>
      <Box sx={{ ml: '20px' }}>
        <h1>Dashboard</h1>
      </Box>
      <Button
        sx={{
          ml: '20px'
        }}
        variant='contained'
        color='primary'
        onClick={toggleTheme}
      >
        Clique aqui
      </Button>
    </>
  )
}