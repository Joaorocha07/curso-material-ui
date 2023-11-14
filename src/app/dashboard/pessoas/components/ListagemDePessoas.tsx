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
import SweetAlert from '@/shared/components/sweet-alert/Sweetalert'
import { CidadesService } from '@/shared/services/api/cidades/CidadesService'
import { IDetalheCidade } from '@/types/cidades'

export default function ListagemDePessoas() {
  const [busca, setBusca] = useState<string>('')
  const [pagina, setPagina] = useState(1)
  const { debounce } = useDebounce()

  const router = useRouter()

  const [rows, setRows] = useState<IListagemPessoa[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [cidade, setCidade] = useState<IDetalheCidade[]>()

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
    CidadesService.getAll(1)
      .then((result) => {
        console.log(result)
  
        if(result instanceof Error) {
          SweetAlert({
            title: 'Erro',
            text: result.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          return
        } else {
          console.log(result)
          const cidades = result.data.map((cidade) => ({
            id: cidade.id,
            nome: cidade.nome
          }))
          setCidade(cidades)
          console.log(cidades)
        }
      })
  }, [])

  useEffect(() => {
    setLoading(true)

    debounce(() => {
      void limpaBuscar()
      PessoasService.getAll(pagina, busca)
        .then((result) => {
          setLoading(false)

          if(result instanceof Error) {
            SweetAlert({
              title: 'Erro',
              text: result.message,
              icon: 'error',
              confirmButtonText: 'Ok'
            })
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
    SweetAlert({
      title: 'Realmente deseja apagar?',
      text: 'Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      secondAlertOptions: {
        title: 'Sucesso',
        text: 'Registro apagado com sucesso!',
        icon: 'success',
      },
    }).then((result) => {
      if (result && result.isConfirmed) {
        PessoasService.deleteById(id)
          .then(result => {
            if (result instanceof Error) {
              SweetAlert({
                title: 'Erro',
                text: result.message,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            } else {
              setRows(oldRows => [
                ...oldRows.filter(oldRow => oldRow.id !== id)
              ])
            }
          })  
      }
    })
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
                <TableCell>
                  {cidade && cidade.find((c) => c.id === row.cidadeId)?.nome || 'Cidade não encontrada'}
                </TableCell>

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