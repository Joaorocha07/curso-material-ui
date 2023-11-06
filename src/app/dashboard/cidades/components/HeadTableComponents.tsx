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
        <TableCell>Nome</TableCell>
      </TableRow>
    </TableHead>
  )
}