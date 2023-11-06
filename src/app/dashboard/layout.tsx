'use client'
import MenuLateral from './components/MenuLateral'
import { 
  DrawerProvider
} from '@/shared/contexts/Menu/DrawerContext'

import '../../shared/forms/TraducoesYup'

export default function DasboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <DrawerProvider>
        <MenuLateral>
          {children}  
        </MenuLateral>
      </DrawerProvider>
    </div>
  )
}
