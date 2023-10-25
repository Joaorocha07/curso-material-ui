import { Box, useMediaQuery, useTheme } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import MenuItens from './MenuItens'
import { 
  useDrawerContext 
} from '@/shared/contexts/Menu/DrawerContext'

export default function SelectionMenus() {
  const theme = useTheme()
  const {
    toggleDrawerOpen
  } = useDrawerContext()
  const isMobile = useMediaQuery(
    theme.breakpoints.down('sm'))

  return (
    <Box flex={1}>
      <MenuItens 
        text='Dashboard' 
        link='/dashboard' 
        onClick={
          isMobile ? toggleDrawerOpen : undefined
        }
      >
        <HomeIcon />
      </MenuItens>
    </Box>
  )
}