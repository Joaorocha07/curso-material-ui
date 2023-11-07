'use client'
import { useAuthContext } 
  from '@/shared/contexts/Auth/AuthContext'
import { 
  Box, 
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  CircularProgress, 
  TextField, 
  Typography
} from '@mui/material'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import * as yup from 'yup'

const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  senha: yup.string().required().min(8)
})

export default function Login() {
  const { login } = useAuthContext()
  const { isAuthenticated } = useAuthContext()
  console.log(isAuthenticated)

  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  
  const [emailError, setEmailError] = useState('')
  const [senhaError, setSenhaError] = useState('')

  const handleSubmit = () => {
    setLoading(true)
    loginSchema
      .validate({ email, senha }, { abortEarly: false })
      .then(dadosValidados => {
        setLoading(true)
        login(dadosValidados.email, dadosValidados.senha)
          .then(() => {
            setLoading(false)
          })
      })
      .catch((errors: yup.ValidationError) => {
        setLoading(false)

        errors.inner.forEach(error => {
          if (error.path === 'email') {
            setEmailError(error.message)
          } else if (error.path === 'senha') {
            setSenhaError(error.message)
          }
        })
      })
  } 

  if (!isAuthenticated) return (
    <>
      <Box 
        width='100vw' 
        height='100vh' 
        display='flex' 
        alignItems='center' 
        justifyContent='center'
      >
        <Card>
          <CardContent>
            <Box 
              display='flex' 
              flexDirection='column' 
              gap={2}
              width={250}
            >
              <Typography 
                variant='h6' 
                align='center'
              >
                Faça login
              </Typography>
              <TextField
                fullWidth
                label='Email'
                type='email'
                value={email}
                disabled={loading}
                error={!!emailError}
                helperText={emailError}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={() => setEmailError('')}
              />
              <TextField
                fullWidth 
                label='Senha'
                type='password'
                value={senha}
                disabled={loading}
                error={!!senhaError}
                helperText={senhaError}
                onChange={e => setSenha(e.target.value)}
                onKeyDown={() => setSenhaError('')}
              />
            </Box>
          </CardContent>
          <CardActions>
            <Box 
              width='100%' 
              display='flex' 
              justifyContent='center'
            >
              <Button 
                variant='contained' 
                disabled={loading}
                onClick={handleSubmit}
                endIcon={loading ? 
                  <CircularProgress 
                    variant='indeterminate' 
                    color='inherit' 
                    size={20} 
                  /> : undefined}
              >
                Entrar
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  )

  return (
    redirect('/dashboard')
  )
}