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
    barraDeFerramentas?: ReactNode
}

export default function LayoutBaseDePagina({
  children,
  titulo,
  barraDeFerramentas
}: ILayoutBaseDePaginaProps) {
  const { toggleDrawerOpen } = useDrawerContext()
  const theme = useTheme()
  const isMobile = useMediaQuery(
    theme.breakpoints.down('sm'))
  const mdDonw = useMediaQuery(
    theme.breakpoints.down('md'))


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
        height={theme.spacing(
          isMobile ? 6 : mdDonw ? 8 : 12
        )}
        gap={1}
      >
        {isMobile && (
          <IconButton onClick={toggleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography 
          variant={isMobile ? 'h5' : mdDonw ? 'h4' : 'h3'} 
          whiteSpace='nowrap' 
          overflow='hidden'
          textOverflow='ellipsis'
        >
          {titulo}
        </Typography>
      </Box>
      {barraDeFerramentas && (
        <Box>
          {barraDeFerramentas}
        </Box>
      )}
      <Box flex={1} overflow='auto'>
        {children}
      </Box>
    </Box>
  )
}