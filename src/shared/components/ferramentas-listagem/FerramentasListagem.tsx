import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import { 
  Box, 
  Button, 
  IconButton, 
  Paper, 
  TextField,
  useTheme 
} from '@mui/material'
import { Enviroment } from '@/shared/environment'

interface IFerramentasListagemProps {
    textoDaBusca?: string
    mostrarInputBusca?: boolean
    aoMudarTextoDaBusca?: (novoTexto : string) => void
    textoBotaoNovo?: string
    mostrarBotaoNovo?: boolean
    aoClicarEmNovo?: () => void
}

export default function FerramentasListagem({
  textoDaBusca = '',
  mostrarInputBusca = false,
  aoMudarTextoDaBusca,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
  aoClicarEmNovo
} : IFerramentasListagemProps) {
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
      {mostrarInputBusca && (
        <TextField 
          size='small'
          placeholder={Enviroment.INPUT_DE_BUSCA}
          value={textoDaBusca}
          onChange={
            (e) => aoMudarTextoDaBusca?.(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <IconButton>
                <SearchIcon style={{ color: 'gray' }} />
              </IconButton>
            ),
          }}
        />
      )}
      <Box flex={1} display='flex' justifyContent='end'>
        {mostrarBotaoNovo && (
          <Button 
            variant='contained' 
            color='primary' 
            endIcon={<AddIcon />}
            onClick={aoClicarEmNovo}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  )
}