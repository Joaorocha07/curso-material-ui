import { Box, useMediaQuery, useTheme } from '@mui/material'
import MenuItens from './MenuItens'
import { 
  useDrawerContext 
} from '@/shared/contexts/Menu/DrawerContext'
import { 
  useAppThemeContext 
} from '@/shared/contexts/Theme/ThemeContext'

// icons
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import LocationCityIcon 
  from '@mui/icons-material/LocationCity'
import NightlightRoundIcon 
  from '@mui/icons-material/NightlightRound'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuthContext } 
  from '@/shared/contexts/Auth/AuthContext'

export default function SelectionMenus() {
  const theme = useTheme()
  const {
    toggleDrawerOpen
  } = useDrawerContext()
  const isMobile = useMediaQuery(
    theme.breakpoints.down('sm'))

  const { toggleTheme } = useAppThemeContext()
  const { logout } = useAuthContext()

  return (
    <>
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
        <MenuItens 
          text='Cidades' 
          link='/dashboard/cidades' 
          onClick={
            isMobile ? toggleDrawerOpen : undefined
          }
        >
          <LocationCityIcon />
        </MenuItens>
        <MenuItens 
          text='Pessoas' 
          link='/dashboard/pessoas' 
          onClick={
            isMobile ? toggleDrawerOpen : undefined
          }
        >
          <PeopleIcon />
        </MenuItens>
      </Box>
      <Box>
        <MenuItens 
          text='Alternar tema' 
          link='' 
          onClick={toggleTheme}
        >
          <NightlightRoundIcon />
        </MenuItens>
      </Box>
      <Box>
        <MenuItens 
          text='Sair' 
          link='' 
          onClick={logout}
        >
          <LogoutIcon />
        </MenuItens>
      </Box>
    </>
  )
}