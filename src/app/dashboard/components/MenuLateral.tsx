'use client'
import { IChildrenProp } from '@/types/global'
import { 
  Avatar,
  Box,
  Divider,
  Drawer,
  useMediaQuery,
  useTheme
}  from '@mui/material'
import { 
  useDrawerContext 
} from '../../../shared/contexts/Menu/DrawerContext'
import SelectionMenus from './SelectionMenus'

export default function MenuLateral({ 
  children 
}: IChildrenProp) {
  const theme = useTheme()
  const { 
    isDrawerOpen, 
    toggleDrawerOpen
  } = useDrawerContext()
  const isMobile = useMediaQuery(
    theme.breakpoints.down('sm'))

  return (
    <>
      <Drawer 
        open={isDrawerOpen}   
        variant={isMobile ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Box 
          width={theme.spacing(28)} 
          display='flex' 
          flexDirection='column'
          height='100%'
        >
          <Box 
            width='100%' 
            height={theme.spacing(20)} 
            display='flex' 
            alignItems='center' 
            justifyContent='center'
          >
            <Avatar 
              sx={{
                height: theme.spacing(12),
                width: theme.spacing(12)
              }}
              src='/static/images/avatar/1.jpg'
            />
          </Box>
          <Divider />
          <SelectionMenus />
        </Box>
      </Drawer>
      <Box 
        height='100vh' 
        ml={isMobile ? 0 : theme.spacing(28)}
      >
        {children}
      </Box>
    </>
  )
}