import { 
  TableCell, 
  TableHead, 
  TableRow 
} from '@mui/material'

export default function HeadTableComponents() {
  return (
    <TableHead>
      <TableRow>
        <TableCell width={100}>Ações</TableCell>
        <TableCell>Nome completo</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Cidade</TableCell>
      </TableRow>
    </TableHead>
  )
}