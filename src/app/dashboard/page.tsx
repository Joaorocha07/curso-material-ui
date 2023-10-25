'use client'
import LayoutBaseDePagina 
  from '@/shared/layouts/LayoutBaseDePagina'

export default function Dashboard() {
  return (
    <>
      <LayoutBaseDePagina 
        titulo='Dashboard' 
        barraDeFerramentas={<>Barra de ferramentas</>}
      >
        Conteudo da página
      </LayoutBaseDePagina>
    </>
  )
}