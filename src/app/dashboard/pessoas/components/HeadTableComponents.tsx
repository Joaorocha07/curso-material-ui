import { 
  TableCell, 
  TableHead, 
  TableRow 
} from '@mui/material'

export default function HeadTableComponents() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Ações</TableCell>
        <TableCell>Nome completo</TableCell>
        <TableCell>Email</TableCell>
      </TableRow>
    </TableHead>
  )
}