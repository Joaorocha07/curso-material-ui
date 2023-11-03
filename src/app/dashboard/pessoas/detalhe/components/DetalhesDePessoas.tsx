/* eslint-disable max-len */
'use client'
import FerramentasDetalhes 
  from '@/shared/components/ferramentas-detalhes/FerramentasDetalhes'
import VTextField from '@/shared/forms/VTextField'
import LayoutBaseDePagina 
  from '@/shared/layouts/LayoutBaseDePagina'
import { PessoasService } from '@/shared/services/api/pessoas/PessoasService'
import { Form } from '@unform/web'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DetalhesDePessoas({
  id,
}: {
    id: string
 }) {
  const router = useRouter()

  const [loaging, setLoading] = useState(false)
  const [nome, setNome] = useState('')

  useEffect(() => {
    if (id !== 'nova') {
      setLoading(true)
      PessoasService.getById(Number(id))
        .then((result) => {
          setLoading(false)
          if (result instanceof Error) {
            alert(result.message)
            router.push('/dashboard/pessoas')
          } else {
            console.log(result)
            setNome(result.nomeCompleto)
          }
        })
    }
  }, [id])

  const handleSave = () => {
    console.log('save')
  }
  
  const handleDelete = (id: number) => {
    if(confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            alert('Registro apagado com sucesso!')
            router.push('/dashboard/pessoas')
          }
        })
    }
  }

  return (
    <LayoutBaseDePagina 
      titulo={id === ' nova' ? 'Nova pessoa' : nome}
      barraDeFerramentas={
        <FerramentasDetalhes 
          textoBotaoNovo='Nova'
          mostrarBotaoSalvar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmSalvar={handleSave}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => router.push('/dashboard/pessoas/detalhe/nova')}
          aoClicarEmVoltar={() => router.push('/dashboard/pessoas')}
        />
      }
    >
      <Form onSubmit={(dados) => console.log(dados)}>
        <VTextField 
          name='nomeCompleto'  
        />

        <button type='submit'>Submit</button>
      </Form>
    </LayoutBaseDePagina>
  )
}