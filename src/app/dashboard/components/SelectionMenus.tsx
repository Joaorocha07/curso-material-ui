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
import EmojiPeopleIcon 
  from '@mui/icons-material/EmojiPeople'
import NightlightRoundIcon 
  from '@mui/icons-material/NightlightRound'

export default function SelectionMenus() {
  const theme = useTheme()
  const {
    toggleDrawerOpen
  } = useDrawerContext()
  const isMobile = useMediaQuery(
    theme.breakpoints.down('sm'))

  const { toggleTheme } = useAppThemeContext()

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
          text='Pessoas' 
          link='/dashboard/pessoas' 
          onClick={
            isMobile ? toggleDrawerOpen : undefined
          }
        >
          <EmojiPeopleIcon />
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
    </>
  )
}