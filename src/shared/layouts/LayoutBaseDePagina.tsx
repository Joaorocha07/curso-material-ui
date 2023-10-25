import MenuIcon from '@mui/icons-material/Menu'
import { 
  Box, 
  IconButton, 
  Typography, 
  useMediaQuery, 
  useTheme 
} from '@mui/material'
import { ReactNode } from 'react'
import { 
  useDrawerContext 
} from '../contexts/Menu/DrawerContext'

interface ILayoutBaseDePaginaProps {
    children: ReactNode
    titulo: string
}

export default function LayoutBaseDePagina({
  children,
  titulo 
}: ILayoutBaseDePaginaProps) {
  const { toggleDrawerOpen } = useDrawerContext()
  const theme = useTheme()
  const isMobile = useMediaQuery(
    theme.breakpoints.down('sm'))


  return (
    <Box 
      height='100%' 
      display='flex' 
      flexDirection='column'
      gap={1}
    >
      <Box 
        padding={1} 
        display='flex' 
        alignItems='center'
        gap={1}
        height={theme.spacing(12)}
      >
        {isMobile && (
          <IconButton onClick={toggleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant='h5'>
          {titulo}
        </Typography>
      </Box>
      <Box>
        Barra de ferramentas
      </Box>
      <Box>
        {children}
      </Box>
    </Box>
  )
}