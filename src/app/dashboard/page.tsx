'use client'
// eslint-disable-next-line max-len
import FerramentasDetalhes from '@/shared/components/ferramentas-detalhes/FerramentasDetalhes'
import LayoutBaseDePagina 
  from '@/shared/layouts/LayoutBaseDePagina'

export default function Dashboard() {
  return (
    <>
      <LayoutBaseDePagina 
        titulo='Dashboard' 
        barraDeFerramentas={
          <FerramentasDetalhes mostrarBotaoSalvarEFechar />
        }
      >
        Conteudo da página
      </LayoutBaseDePagina>
    </>
  )
}