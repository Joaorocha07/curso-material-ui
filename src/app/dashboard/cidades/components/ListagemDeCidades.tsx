/* eslint-disable max-len */
'use client'
import FerramentasListagem from '@/shared/components/ferramentas-listagem/FerramentasListagem'
import LayoutBaseDePagina from 
  '@/shared/layouts/LayoutBaseDePagina'
import { useEffect, useState } from 'react'

export default function ListagemDeCidades() {
  const [busca, setBusca] = useState<string>('')

  const handleInputChange = (texto: string) => {
    setBusca(texto)
    const queryString = texto.trim() !== '' ? `?busca=${texto}` : ''
    window.history.pushState({}, '', `/dashboard/cidades${queryString}`)
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const buscaParam = params.get('busca')
    if (buscaParam) {
      setBusca(buscaParam)
    }
  }, [])

  return (
    <LayoutBaseDePagina 
      titulo="Listagem de cidades" 
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