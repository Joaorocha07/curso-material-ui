/* eslint-disable max-len */
'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormHandles } from '@unform/core'
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import { Form } from '@unform/web'

import { PessoasService } from '@/shared/services/api/pessoas/PessoasService'
import FerramentasDetalhes 
  from '@/shared/components/ferramentas-detalhes/FerramentasDetalhes'
import LayoutBaseDePagina 
  from '@/shared/layouts/LayoutBaseDePagina'
import VTextField from '@/shared/forms/VTextField'

interface IFormData {
  email: string
  cidadeId: number
  nomeCompleto: string
}

export default function DetalhesDePessoas({
  id,
}: {
    id: string
 }) {
  const router = useRouter()

  const formRef = useRef<FormHandles>(null)

  const [loading, setLoading] = useState(false)
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

            formRef.current?.setData(result)
          }
        })
    }
  }, [id])

  const handleSave = (dados : IFormData) => {
    console.log(dados)
    setLoading(true)
    if (id === 'nova') {
      PessoasService
        .create(dados)
        .then((result) => {
          setLoading(false)
          
          if (result instanceof Error) {
            alert(result.message)
          } else {
            router.push(`/dashboard/pessoas/detalhe/${result}`)
          }
        })
    } else {
      PessoasService
        .updateById(Number(id), {id: Number(id), ...dados})
        .then((result) => {
          setLoading(false)
          
          if (result instanceof Error) {
            alert(result.message)
          }
        })
    }
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
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => router.push('/dashboard/pessoas/detalhe/nova')}
          aoClicarEmVoltar={() => router.push('/dashboard/pessoas')}
          aoClicarEmSalvarEVoltar={() => formRef.current?.submitForm()}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <Box 
          margin={1} 
          display='flex' 
          flexDirection='column' 
          component={Paper}
          variant='outlined'
        >
          <Grid 
            container 
            direction='column' 
            padding={2} 
            spacing={2}
          >
            {loading &&(
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>            
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12}>
                <VTextField
                  fullWidth 
                  name='nomeCompleto' 
                  label='Nome Completo' 
                  disabled={loading}
                  onChange={e => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12}>
                <VTextField
                  fullWidth 
                  name='email' 
                  label='E-mail' 
                  disabled={loading}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12}>
                <VTextField
                  fullWidth 
                  name='cidadeId' 
                  label='Cidade' 
                  disabled={loading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </LayoutBaseDePagina>
  )
}