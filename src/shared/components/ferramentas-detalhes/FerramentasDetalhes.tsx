import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { 
  Box, 
  Button, 
  Divider, 
  Paper, 
  Skeleton, 
  useTheme 
} from '@mui/material'

interface IFerramentasDetalhesProps {
    textoBotaoNovo?: string

    mostrarBotaoNovo?: boolean
    mostrarBotaoVoltar?: boolean
    mostrarBotaoApagar?: boolean
    mostrarBotaoSalvar?: boolean
    mostrarBotaoSalvarEFechar?: boolean

    mostrarBotaoNovoCarregando?: boolean
    mostrarBotaoVoltarCarregando?: boolean
    mostrarBotaoApagarCarregando?: boolean
    mostrarBotaoSalvarCarregando?: boolean
    mostrarBotaoSalvarEFecharCarregando?: boolean

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

  mostrarBotaoNovoCarregando          = false,
  mostrarBotaoVoltarCarregando        = false,
  mostrarBotaoApagarCarregando        = false,
  mostrarBotaoSalvarCarregando        = false,
  mostrarBotaoSalvarEFecharCarregando = false,

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
      {(mostrarBotaoSalvar && 
        !mostrarBotaoSalvarCarregando) && (
        <Button 
          variant='contained' 
          color='primary' 
          startIcon={<SaveIcon />}
          onClick={aoClicarEmSalvar}
        >
          Salvar
        </Button>
      )}

      {mostrarBotaoSalvarCarregando &&(
        <Skeleton width={108} height={62} />
      )}

      {(mostrarBotaoSalvarEFechar && 
        !mostrarBotaoSalvarEFecharCarregando) && (
        <Button 
          variant='outlined' 
          color='primary' 
          startIcon={<SaveIcon />}
          onClick={aoClicarEmSalvarEFechar}
        >
          Salvar e voltar
        </Button>
      )}

      {mostrarBotaoSalvarEFecharCarregando &&(
        <Skeleton width={186} height={62} />
      )}

      {(mostrarBotaoApagar && 
        !mostrarBotaoApagarCarregando) && (
        <Button 
          variant='outlined' 
          color='primary' 
          startIcon={<DeleteIcon />}
          onClick={aoClicarEmApagar}
        >
          Apagar
        </Button>    
      )}

      {mostrarBotaoApagarCarregando &&( 
        <Skeleton width={115} height={62} />
      )}

      {(mostrarBotaoNovo && 
        !mostrarBotaoNovoCarregando) && (
        <Button 
          variant='outlined' 
          color='primary' 
          startIcon={<AddIcon />}
          onClick={aoClicarEmNovo}
        >
          {textoBotaoNovo}
        </Button>
      )}

      {mostrarBotaoNovoCarregando &&(
        <Skeleton width={98} height={62} />
      )}

      <Divider variant='middle' orientation='vertical' />

      {(mostrarBotaoVoltar && 
        !mostrarBotaoVoltarCarregando) && (
        <Button 
          variant='outlined' 
          color='primary' 
          startIcon={<ArrowBackIcon />}
          onClick={aoClicarEmVoltar}
        >
          Voltar
        </Button>
      )}

      {mostrarBotaoVoltarCarregando &&(
        <Skeleton width={109} height={62} />
      )}

    </Box>
  )
}