'use client'
import { 
  useDrawerContext 
} from '@/shared/contexts/Menu/DrawerContext'
import { 
  useAppThemeContext
} from '@/shared/contexts/Theme/ThemeContext'
import { Box, Button } from '@mui/material'

export default function Dashboard() {
  const { toggleTheme } = useAppThemeContext()
  const { toggleDrawerOpen } = useDrawerContext()

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
        Altere o fundo da página
      </Button>
      <Button
        sx={{
          ml: '20px'
        }}
        variant='contained'
        color='primary'
        onClick={toggleDrawerOpen}
      >
        Abra o menu
      </Button>
    </>
  )
}