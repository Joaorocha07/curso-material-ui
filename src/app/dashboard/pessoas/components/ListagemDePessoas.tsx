/* eslint-disable max-len */
'use client'
import { useEffect, useState } from 'react'
import { 
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableFooter, 
  TableRow 
} from '@mui/material'

import FerramentasListagem from '@/shared/components/ferramentas-listagem/FerramentasListagem'
import useDebounce from '@/shared/hooks/UseDebounce'
import LayoutBaseDePagina from '@/shared/layouts/LayoutBaseDePagina'
import { PessoasService } from '@/shared/services/api/pessoas/PessoasService'

import { IListagemPessoa } from '@/types/pessoas'
import { Enviroment } from '@/shared/environment'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useRouter } from 'next/navigation'
import HeadTableComponents from './HeadTableComponents'

export default function ListagemDePessoas() {
  const [busca, setBusca] = useState<string>('')
  const [pagina, setPagina] = useState(1)
  const { debounce } = useDebounce()

  const router = useRouter()

  const [rows, setRows] = useState<IListagemPessoa[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const limpaBuscar = () => {
    const params = new URLSearchParams(window.location.search)
    const buscaParam = params.get('busca')
    if (buscaParam) {
      setBusca(buscaParam)
    }
  }

  const handleInputChange = (texto: string) => {
    setBusca(texto)
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('busca', texto)
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`
    window.history.pushState({}, '', newUrl)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPagina(page) 
  }

  useEffect(() => {
    setLoading(true)

    debounce(() => {
      void limpaBuscar()
      PessoasService.getAll(pagina, busca)
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
  }, [busca, pagina])

  const handleDelete = (id: number) => {
    if(confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            setRows(oldRows => [
              ...oldRows.filter(oldRow => oldRow.id !== id)
            ])
            alert('Registro apagado com sucesso!')
          }
        })
    }
  }

  return (
    <LayoutBaseDePagina 
      titulo="Listagem de pessoas" 
      barraDeFerramentas={
        <FerramentasListagem 
          textoBotaoNovo='Nova' 
          mostrarInputBusca  
          textoDaBusca={busca}
          aoClicarEmNovo={() => router.push('/dashboard/pessoas/detalhe/nova')}
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
          <HeadTableComponents />

          <TableBody >
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size='small' onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton size='small' onClick={() => router.push(`/dashboard/pessoas/detalhe/${row.id}`) }>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !loading && (
            <caption>{Enviroment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
            {loading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
            {(totalCount > 0 && totalCount > Enviroment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination 
                    page={pagina}
                    count={Math.ceil(totalCount / Enviroment.LIMITE_DE_LINHAS)} 
                    onChange={handlePageChange}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  )
}