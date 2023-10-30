/* eslint-disable max-len */
'use client'
import { useEffect, useState } from 'react'
import { 
  Paper,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@mui/material'

import FerramentasListagem from '@/shared/components/ferramentas-listagem/FerramentasListagem'
import useDebounce from '@/shared/hooks/UseDebounce'
import LayoutBaseDePagina from '@/shared/layouts/LayoutBaseDePagina'
import { PessoasService } from '@/shared/services/api/pessoas/PessoasService'

import { IListagemPessoa } from '@/types/pessoas'

export default function ListagemDePessoas() {
  const [busca, setBusca] = useState<string>('')
  const { debounce } = useDebounce()

  const [rows, setRows] = useState<IListagemPessoa[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)

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
    setLoading(true)

    debounce(() => {
      void limpaBuscar()
      PessoasService.getAll(1, busca)
        .then((result) => {
          setLoading(false)

          if(result instanceof Error) {
            alert(result.message)
            return
          } else {
            console.log(result)
            setTotalCount(result.totalCount)
            setRows(result.data)
          }
        })
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
      <TableContainer 
        component={Paper} 
        variant='outlined' 
        sx={{ m: 1, width: 'auto' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          
          {rows.map(row => (
            <TableBody key={row.id}>
              <TableRow>
                <TableCell>Ações</TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  )
}