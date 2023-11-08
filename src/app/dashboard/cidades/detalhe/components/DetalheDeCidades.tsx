/* eslint-disable max-len */
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import { Form } from '@unform/web'
import * as yup from 'yup'

import { CidadesService } from '@/shared/services/api/cidades/CidadesService'
import FerramentasDetalhes 
  from '@/shared/components/ferramentas-detalhes/FerramentasDetalhes'
import LayoutBaseDePagina 
  from '@/shared/layouts/LayoutBaseDePagina'
import VTextField from '@/shared/forms/VTextField'
import { useVForm } from '@/shared/forms/useVForm'
import { IVFormErrors } from '@/shared/forms/IvFormErrors'
import SweetAlert from '@/shared/components/sweet-alert/Sweetalert'

interface IFormData {
  nome: string
}

const formValidationSchema = yup.object().shape({
  nome: yup.string().required().min(3)
})

export default function DetalhesDeCidades({
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
      CidadesService.getById(Number(id))
        .then((result) => {
          setLoading(false)
          if (result instanceof Error) {
            SweetAlert({
              title: 'Erro',
              text: result.message,
              icon: 'error',
            })
            router.push('/dashboard/cidades')
          } else {
            console.log(result)
            setNome(result.nome)

            formRef.current?.setData(result)
          }
        })
    } else {
      formRef.current?.setData({
        nome: ''
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
          CidadesService
            .create(dadosValidados)
            .then((result) => {
              setLoading(false)
              
              if (result instanceof Error) {
                SweetAlert({
                  title: 'Erro',
                  text: result.message,
                  icon: 'error',
                })
              } else {
                if (isSaveAndClose()) {
                  router.push('/dashboard/cidades')
                } else {
                  router.push(`/dashboard/cidades/detalhe/${result}`)
                }
              }
            })
        } else {
          CidadesService
            .updateById(Number(id), {id: Number(id), ...dadosValidados})
            .then((result) => {
              setLoading(false)
              
              if (result instanceof Error) {
                SweetAlert({
                  title: 'Erro',
                  text: result.message,
                  icon: 'error',
                })
              } else {
                if (isSaveAndClose()) {
                  router.push('/dashboard/cidades')
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
        
        formRef.current?.setErrors(validationErrors)
      })
  }
  
  const handleDelete = (id: number) => {
    if(confirm('Realmente deseja apagar?')) {
      CidadesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            SweetAlert({
              title: 'Erro',
              text: result.message,
              icon: 'error',
            })
          } else {
            SweetAlert({
              title: 'Sucesso',
              text: 'Registro apagado com sucesso!',
              icon: 'success',
            })
            router.push('/dashboard/cidades')
          }
        })
    }
  }

  return (
    <LayoutBaseDePagina 
      titulo={id === 'nova' ? 'Nova cidade' : nome}
      barraDeFerramentas={
        <FerramentasDetalhes 
          textoBotaoNovo='Nova'
          mostrarBotaoSalvar
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmSalvar={save}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => router.push('/dashboard/cidades/detalhe/nova')}
          aoClicarEmVoltar={() => router.push('/dashboard/cidades')}
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
                  name='nome' 
                  label='Nome' 
                  disabled={loading}
                  onChange={e => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </LayoutBaseDePagina>
  )
}