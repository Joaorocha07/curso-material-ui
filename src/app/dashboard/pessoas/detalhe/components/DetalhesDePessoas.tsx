/* eslint-disable max-len */
'use client'
import FerramentasDetalhes 
  from '@/shared/components/ferramentas-detalhes/FerramentasDetalhes'
import LayoutBaseDePagina 
  from '@/shared/layouts/LayoutBaseDePagina'
import { useRouter } from 'next/navigation'

export default function DetalhesDePessoas({
  id,
}: {
    id: string
 }) {
  const router = useRouter()

  const handleSave = () => {
    console.log('save')
  }
  
  const handleDelete = () => {
    console.log('save')
  }

  return (
    <LayoutBaseDePagina 
      titulo='Detalhe de pessoa'
      barraDeFerramentas={
        <FerramentasDetalhes 
          textoBotaoNovo='Nova'
          mostrarBotaoSalvar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmSalvar={handleSave}
          aoClicarEmApagar={handleDelete}
          aoClicarEmNovo={() => router.push('/dashboard/pessoas/detalhe/nova')}
          aoClicarEmVoltar={() => router.push('/dashboard/pessoas')}
        />
      }
    >
      <p>Detalhe de pessoas {id}</p>
    </LayoutBaseDePagina>
  )
}