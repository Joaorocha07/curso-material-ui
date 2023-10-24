'use client'
import { IChildrenProp } from '@/types/global'
import HomeIcon from '@mui/icons-material/Home'
import { 
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme
}  from '@mui/material'

export default function MenuLateral({ 
  children 
}: IChildrenProp) {
  const theme = useTheme()
  return (
    <>
      <Drawer variant='permanent'>
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
          <Box flex={1}>
            <List component='nav'>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height='100vh' ml={theme.spacing(28)}>
        {children}
      </Box>
    </>
  )
}