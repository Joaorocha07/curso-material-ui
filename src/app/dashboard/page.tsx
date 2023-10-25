'use client'
// eslint-disable-next-line max-len
import BarraDeFerramentas from '@/shared/components/barra-de-ferramentas/BarraDeFerramentas'
import LayoutBaseDePagina 
  from '@/shared/layouts/LayoutBaseDePagina'

export default function Dashboard() {
  return (
    <>
      <LayoutBaseDePagina 
        titulo='Dashboard' 
        barraDeFerramentas={
          <BarraDeFerramentas 
            mostrarInputBusca textoBotaoNovo='NOVA' />
        }
      >
        Conteudo da página
      </LayoutBaseDePagina>
    </>
  )
}