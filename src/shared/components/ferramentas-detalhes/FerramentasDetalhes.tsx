import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { 
  Box, 
  Button, 
  Divider, 
  Paper, 
  useTheme 
} from '@mui/material'

interface IFerramentasDetalhesProps {
    textoBotaoNovo?: string

    mostrarBotaoNovo?: boolean
    mostrarBotaoVoltar?: boolean
    mostrarBotaoApagar?: boolean
    mostrarBotaoSalvar?: boolean
    mostrarBotaoSalvarEFechar?: boolean

    aoClicarEmNovo?: () => void
    aoClicarEmVoltar?: () => void
    aoClicarEmApagar?: () => void
    aoClicarEmSalvar?: () => void
    aoClicarEmSalvarEFechar?: () => void
}

export default function FerramentasListagem({
  textoBotaoNovo = 'Novo',

  mostrarBotaoNovo          = true,
  mostrarBotaoVoltar        = true,
  mostrarBotaoApagar        = true,
  mostrarBotaoSalvar        = true,
  mostrarBotaoSalvarEFechar = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar
} : IFerramentasDetalhesProps) {
  const theme = useTheme()

  return (
    <Box
      gap={1}
      marginX={1} 
      padding={1}
      paddingX={2}
      display='flex'
      alignItems='center'
      height={theme.spacing(7)}
      component={Paper}
    >
      {mostrarBotaoSalvar && (
        <Button 
          variant='contained' 
          color='primary' 
          startIcon={<SaveIcon />}
          onClick={aoClicarEmSalvar}
        >
          Salvar
        </Button>
      )}

      {mostrarBotaoSalvarEFechar && (
        <Button 
          variant='outlined' 
          color='primary' 
          startIcon={<SaveIcon />}
          onClick={aoClicarEmSalvarEFechar}
        >
          Salvar e voltar
        </Button>
      )}

      {mostrarBotaoApagar && (
        <Button 
          variant='outlined' 
          color='primary' 
          startIcon={<DeleteIcon />}
          onClick={aoClicarEmApagar}
        >
          Apagar
        </Button>    
      )}

      {mostrarBotaoNovo && (
        <Button 
          variant='outlined' 
          color='primary' 
          startIcon={<AddIcon />}
          onClick={aoClicarEmNovo}
        >
          {textoBotaoNovo}
        </Button>
      )}

      <Divider variant='middle' orientation='vertical' />

      {mostrarBotaoVoltar && (
        <Button 
          variant='outlined' 
          color='primary' 
          startIcon={<ArrowBackIcon />}
          onClick={aoClicarEmVoltar}
        >
          Voltar
        </Button>
      )}
    </Box>
  )
}