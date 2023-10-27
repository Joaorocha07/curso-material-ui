/* eslint-disable max-len */
'use client'
import FerramentasListagem from '@/shared/components/ferramentas-listagem/FerramentasListagem'
import LayoutBaseDePagina from 
  '@/shared/layouts/LayoutBaseDePagina'
import { PessoasService } from '@/shared/services/api/pessoas/PessoasService'
import { useEffect, useState } from 'react'

export default function ListagemDePessoas() {
  const [busca, setBusca] = useState<string>('')

  const handleInputChange = (texto: string) => {
    setBusca(texto)
    const queryString = texto.trim() !== '' ? `?busca=${texto}` : ''
    window.history.pushState({}, '', `/dashboard/pessoas${queryString}`)
  }

  const limpaBuscar = () => {
    const params = new URLSearchParams(window.location.search)
    const buscaParam = params.get('busca')
    if (buscaParam) {
      setBusca(buscaParam)
    }
  }

  useEffect(() => {
    void limpaBuscar()
    PessoasService.getAll(1, busca)
      .then((result) => {
        if(result instanceof Error) {
          alert(result.message)
          return
        }
        console.log(result)
      })
  }, [busca])

  return (
    <LayoutBaseDePagina 
      titulo="Listagem de pessoas" 
      barraDeFerramentas={
        <FerramentasListagem 
          textoBotaoNovo='Nova' 
          mostrarInputBusca  
          textoDaBusca={busca}
          aoMudarTextoDaBusca={handleInputChange}
        />
      }
    >
    </LayoutBaseDePagina>
  )
}