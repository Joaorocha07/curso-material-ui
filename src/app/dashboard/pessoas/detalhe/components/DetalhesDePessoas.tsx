/* eslint-disable max-len */
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import { Form } from '@unform/web'
import * as yup from 'yup'

import { PessoasService } from '@/shared/services/api/pessoas/PessoasService'
import FerramentasDetalhes 
  from '@/shared/components/ferramentas-detalhes/FerramentasDetalhes'
import LayoutBaseDePagina 
  from '@/shared/layouts/LayoutBaseDePagina'
import VTextField from '@/shared/forms/VTextField'
import { useVForm } from '@/shared/forms/useVForm'
import { IVFormErrors } from '@/shared/forms/IvFormErrors'
import AutoCompleteCidades from '../../components/AutoCompleteCidades'

interface IFormData {
  email: string
  cidadeId: number
  nomeCompleto: string
}

const formValidationSchema = yup.object().shape({
  nomeCompleto: yup.string().required().min(3),
  email: yup.string().required().email(),
  cidadeId: yup.number().required()
})

export default function DetalhesDePessoas({
  id,
}: {
    id: string
 }) {
  const router = useRouter()

  const { formRef, save, saveAndClose , isSaveAndClose } = useVForm()

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
    } else {
      formRef.current?.setData({
        nomeCompleto: '',
        email: '',
        cidadeId: undefined
      })
    }
  }, [id])

  const handleSave = (dados : IFormData) => {
    console.log(dados)

    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados: IFormData) => {
        setLoading(true)

        if (id === 'nova') {
          PessoasService
            .create(dadosValidados)
            .then((result) => {
              setLoading(false)
              
              if (result instanceof Error) {
                alert(result.message)
              } else {
                if (isSaveAndClose()) {
                  router.push('/dashboard/pessoas')
                } else {
                  router.push(`/dashboard/pessoas/detalhe/${result}`)
                }
              }
            })
        } else {
          PessoasService
            .updateById(Number(id), {id: Number(id), ...dadosValidados})
            .then((result) => {
              setLoading(false)
              
              if (result instanceof Error) {
                alert(result.message)
              } else {
                if (isSaveAndClose()) {
                  router.push('/dashboard/pessoas')
                }
              }
            })
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {}

        errors.inner.forEach(error => {
          if (!error.path) return 

          validationErrors[error.path] = error.message
        })

        console.log(validationErrors)
        
        formRef.current?.setErrors(validationErrors)
      })
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
      titulo={id === 'nova' ? 'Nova pessoa' : nome}
      barraDeFerramentas={
        <FerramentasDetalhes 
          textoBotaoNovo='Nova'
          mostrarBotaoSalvar
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmSalvar={save}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => router.push('/dashboard/pessoas/detalhe/nova')}
          aoClicarEmVoltar={() => router.push('/dashboard/pessoas')}
          aoClicarEmSalvarEVoltar={saveAndClose}
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
                <AutoCompleteCidades isExternalLoading={loading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </LayoutBaseDePagina>
  )
}