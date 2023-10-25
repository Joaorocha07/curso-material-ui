'use client'
import { ReactNode } from 'react'
import { 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material'
import Link from 'next/link'


interface IMenuItensProps {
  onClick: (() => void) | undefined
  link: string  
  children: ReactNode
  text: string
}

export default function MenuItens({
  onClick,
  link,
  children,   
  text
}: IMenuItensProps) {

  const handleClick = (): void => {
    onClick?.()  
  }
  return (
    <Link 
      href={link} 
      style={{ 
        color: 'black', 
        textDecoration: 'none'
      }}
    >
      <List component='nav'>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            {children}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </List>
    </Link>
  )
}