'use client'
// eslint-disable-next-line max-len
import FerramentasListagem from '@/shared/components/ferramentas-listagem/FerramentasListagem'
import LayoutBaseDePagina 
  from '@/shared/layouts/LayoutBaseDePagina'
import { Box, Card, Grid } from '@mui/material'

export default function Dashboard() {
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

              <Grid 
                item 
                xs={12} 
                sm={12} 
                md={6} 
                lg={4} 
                xl={2}
              >
                <Card>Teste</Card>
              </Grid>
              <Grid 
                item 
                xs={12} 
                sm={12} 
                md={6} 
                lg={4} 
                xl={2}
              >
                <Card>Teste</Card>
              </Grid>

            </Grid>
          </Grid>
        </Box>
      </LayoutBaseDePagina>
    </>
  )
}