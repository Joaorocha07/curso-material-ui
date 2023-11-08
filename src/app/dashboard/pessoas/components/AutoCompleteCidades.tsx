import SweetAlert 
  from '@/shared/components/sweet-alert/Sweetalert'
import useDebounce from '@/shared/hooks/UseDebounce'
import { CidadesService } 
  from '@/shared/services/api/cidades/CidadesService'
import { 
  Autocomplete, 
  CircularProgress, 
  TextField 
} from '@mui/material'
import { useField } from '@unform/core'
import { useEffect, useMemo, useState } from 'react'

type IAutoCompleteOption = {
  id: number
  label: string
}

interface IAutoCompleteCidadeProps {
  isExternalLoading?: boolean
}

export default function AutoCompleteCidades({
  isExternalLoading = false
}: IAutoCompleteCidadeProps) {
  const {
    fieldName, 
    registerField, 
    defaultValue, 
    error, 
    clearError
  } = useField('cidadeId')
  const { debounce } = useDebounce()
  const [loading, setLoading] = useState(false)
  const [busca, setBusca] = useState('')
  const [valorSelecionado, setValorSelecionado] = 
    useState<number | undefined>(defaultValue)
  const [opcoes, setOpcoes] = 
    useState<IAutoCompleteOption[]>([])

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => valorSelecionado,
      setValue: (_, newValorSelecionado) => 
        setValorSelecionado(newValorSelecionado) 
    })
  }, [registerField, fieldName, valorSelecionado])

  useEffect(() => {
    setLoading(true)
    
    debounce(() => {
      // void limpaBuscar()
      CidadesService.getAll(1, busca)
        .then((result) => {
          setLoading(false)
    
          if(result instanceof Error) {
            SweetAlert({
              title: 'Erro',
              text: result.message,
              icon: 'error',
            })
            return
          } else {
            console.log(result)
            setOpcoes(result.data.map(cidade => ({ 
              id: cidade.id, label: cidade.nome })
            ))
            console.log(opcoes)
            console.log(valorSelecionado)
          }
        })
    })
  }, [busca])

  const autoCompleteSelectedOption = useMemo(() => {
    if (!valorSelecionado) return null
    
    const selectedOption = 
      opcoes.find(opcao => opcao.id === valorSelecionado)
    
    if (!selectedOption) return null

    return selectedOption
  }, [valorSelecionado, opcoes])

  return (
    <Autocomplete 
      openText='Abrir'
      closeText='Fechar'
      noOptionsText='Sem opções'
      loadingText='Carregando...'
      disablePortal
      value={autoCompleteSelectedOption}
      options={opcoes}
      loading={loading}
      disabled={isExternalLoading}
      onInputChange={(_, newValue) => setBusca(newValue)}
      popupIcon={
        (isExternalLoading || loading) ? 
          <CircularProgress size={28} /> : undefined
      }
      onChange={(_, newValue) => {
        setValorSelecionado(newValue?.id) 
        setBusca(''); clearError()
      }}
      renderInput={(params) => (
        <TextField 
          {...params}
          error={!!error}
          helperText={error}
          label='Cidade'
        />
      )}
    />
  )
}