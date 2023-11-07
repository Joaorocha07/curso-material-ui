'use client'
import MenuLateral from './components/MenuLateral'
import { 
  DrawerProvider
} from '@/shared/contexts/Menu/DrawerContext'
import { redirect } from 'next/navigation'

import '../../shared/forms/TraducoesYup'
import { useAuthContext } 
  from '@/shared/contexts/Auth/AuthContext'

export default function DasboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useAuthContext()
  console.log(isAuthenticated)
  if (isAuthenticated) return (
    <>
      <DrawerProvider>
        <MenuLateral>
          {children}  
        </MenuLateral>
      </DrawerProvider>
    </>
  )
  return (
    redirect('/login')  
  )
}
