'use client'
import { IChildrenProp } from '@/types/global'
import React, { 
  createContext, 
  useCallback, 
  useContext, 
  useState 
} from 'react'

interface IDrawerContextData {
    isDrawerOpen: boolean
    toggleDrawerOpen: () => void
}

const DrawerContext = createContext(
    {} as IDrawerContextData)

export const useDrawerContext = () => {
  return useContext(DrawerContext)
}

export const DrawerProvider = ({
  children 
}: IChildrenProp): JSX.Element => {
  const [isDrawerOpen, setIsDrowerOpen] = useState(false)
    
  const toggleDrawerOpen = useCallback(() => {
    setIsDrowerOpen(oldDrowerOpen => !oldDrowerOpen)
  }, [])

  return (
    <DrawerContext.Provider 
      value={{ 
        isDrawerOpen, 
        toggleDrawerOpen
      }}>
      {children}
    </DrawerContext.Provider>
  )
}