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
  Typography, 
  useMediaQuery, 
  useTheme 
} from '@mui/material'

interface IFerramentasDetalhesProps {
    textoBotaoNovo?: string

    mostrarBotaoNovo?: boolean
    mostrarBotaoVoltar?: boolean
    mostrarBotaoApagar?: boolean
    mostrarBotaoSalvar?: boolean
    mostrarBotaoSalvarEVoltar?: boolean

    mostrarBotaoNovoCarregando?: boolean
    mostrarBotaoVoltarCarregando?: boolean
    mostrarBotaoApagarCarregando?: boolean
    mostrarBotaoSalvarCarregando?: boolean
    mostrarBotaoSalvarEVoltarCarregando?: boolean

    aoClicarEmNovo?: () => void
    aoClicarEmVoltar?: () => void
    aoClicarEmApagar?: () => void
    aoClicarEmSalvar?: () => void
    aoClicarEmSalvarEVoltar?: () => void
}

export default function FerramentasListagem({
  textoBotaoNovo = 'Novo',

  mostrarBotaoNovo          = true,
  mostrarBotaoVoltar        = true,
  mostrarBotaoApagar        = true,
  mostrarBotaoSalvar        = true,
  mostrarBotaoSalvarEVoltar = true,

  mostrarBotaoNovoCarregando          = false,
  mostrarBotaoVoltarCarregando        = false,
  mostrarBotaoApagarCarregando        = false,
  mostrarBotaoSalvarCarregando        = false,
  mostrarBotaoSalvarEVoltarCarregando = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEVoltar
} : IFerramentasDetalhesProps) {
  const theme = useTheme()

  const isMobile = useMediaQuery(
    theme.breakpoints.down('sm'))

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
          <Typography 
            variant='button' 
            whiteSpace='nowrap' 
            textOverflow='ellipsis' 
            overflow='hidden'
          >
            Salvar
          </Typography>
        </Button>
      )}

      {(mostrarBotaoSalvarEVoltar && 
        !mostrarBotaoSalvarEVoltarCarregando &&
          !isMobile) && (
        <Button 
          variant='outlined' 
          color='primary' 
          startIcon={<SaveIcon />}
          onClick={aoClicarEmSalvarEVoltar}
        >
          <Typography 
            variant='button' 
            whiteSpace='nowrap' 
            textOverflow='ellipsis' 
            overflow='hidden'
          >
            Salvar e voltar
          </Typography>
        </Button>
      )}

      {(mostrarBotaoSalvarEVoltarCarregando &&
       !isMobile) &&(
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
          <Typography 
            variant='button' 
            whiteSpace='nowrap' 
            textOverflow='ellipsis' 
            overflow='hidden'
          >
            Apagar
          </Typography>
        </Button>    
      )}

      {mostrarBotaoApagarCarregando &&( 
        <Skeleton width={115} height={62} />
      )}

      {(mostrarBotaoNovo && 
        !mostrarBotaoNovoCarregando && !isMobile) && (
        <Button 
          variant='outlined' 
          color='primary' 
          startIcon={<AddIcon />}
          onClick={aoClicarEmNovo}
        >
          {textoBotaoNovo}
        </Button>
      )}

      {(mostrarBotaoNovoCarregando && !isMobile) && (
        <Skeleton width={98} height={62} />
      )}

      {( mostrarBotaoVoltar &&
          (
            mostrarBotaoNovo || mostrarBotaoApagar || 
            mostrarBotaoSalvar || mostrarBotaoSalvarEVoltar
          )
      ) && (
        <Divider variant='middle' orientation='vertical' />
      )}

      {(mostrarBotaoVoltar && 
        !mostrarBotaoVoltarCarregando) && (
        <Button 
          variant='outlined' 
          color='primary' 
          startIcon={<ArrowBackIcon />}
          onClick={aoClicarEmVoltar}
        >
          <Typography 
            variant='button' 
            whiteSpace='nowrap' 
            textOverflow='ellipsis' 
            overflow='hidden'
          >
            Voltar
          </Typography>
        </Button>
      )}

      {mostrarBotaoVoltarCarregando &&(
        <Skeleton width={109} height={62} />
      )}

    </Box>
  )
}