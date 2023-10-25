'use client'
import { ReactNode } from 'react'
import { 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material'

interface IMenuItens {
    children: ReactNode
    text: string
}

export default function MenuItens({
  children, 
  text
}: IMenuItens) {
  return (
    <List component='nav'>
      <ListItemButton>
        <ListItemIcon>
          {children}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </List>
  )
}