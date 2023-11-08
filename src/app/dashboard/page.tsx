/* eslint-disable max-len */
'use client'
import FerramentasListagem from '@/shared/components/ferramentas-listagem/FerramentasListagem'
import SweetAlert from '@/shared/components/sweet-alert/Sweetalert'
import LayoutBaseDePagina 
  from '@/shared/layouts/LayoutBaseDePagina'
import { CidadesService } from '@/shared/services/api/cidades/CidadesService'
import { PessoasService } from '@/shared/services/api/pessoas/PessoasService'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [loadingCidades, setLoadingCidades] = useState(true)
  const [loadingPessoas, setLoadingPessoas] = useState(true)
  const [totalCountCidades, setTotalCountCidades] = useState(0)
  const [totalCountPessoas, setTotalCountPessoas] = useState(0)

  useEffect(() => {
    setLoadingCidades(true)
    setLoadingPessoas(true)
  
    CidadesService.getAll(1)
      .then((result) => {
        setLoadingCidades(false)
  
        if(result instanceof Error) {
          SweetAlert({
            title: 'Erro',
            text: result.message,
            icon: 'error',
          })
          return
        } else {
          console.log(result)
          setTotalCountCidades(result.totalCount)
        }
      })
    PessoasService.getAll(1)
      .then((result) => {
        setLoadingPessoas(false)
  
        if(result instanceof Error) {
          SweetAlert({
            title: 'Erro',
            text: result.message,
            icon: 'error',
          })
          return
        } else {
          console.log(result)
          setTotalCountPessoas(result.totalCount)
        }
      })
  }, [])
  return (
    <>
      <LayoutBaseDePagina 
        titulo='Dashboard'
        barraDeFerramentas={
          <FerramentasListagem 
            mostrarBotaoNovo={false}
          />
        }
      >
        <Box width='100%' display='flex'>
          <Grid container margin={1}>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <Card>
                  <CardContent>
                    <Typography variant='h5' align='center'>
                      Total de cidades
                    </Typography>
                    <Box 
                      p={6} 
                      display='flex' 
                      justifyContent='center' 
                      alignItems='center'
                    >
                      {!loadingCidades &&(
                        <Typography variant='h1'>
                          {totalCountCidades}
                        </Typography>
                      )}
                      {loadingCidades &&(
                        <Typography variant='body1'>
                          Carregando...
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <Card>
                  <CardContent>
                    <Typography variant='h5' align='center'>
                      Total de pessoas
                    </Typography>
                    <Box 
                      p={6} 
                      display='flex' 
                      justifyContent='center' 
                      alignItems='center'
                    >
                      {!loadingPessoas &&(
                        <Typography variant='h1'>
                          {totalCountPessoas}
                        </Typography>
                      )}
                      {loadingPessoas &&(
                        <Typography variant='body1'>
                          Carregando...
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </LayoutBaseDePagina>
    </>
  )
}