export interface IListagemUsuarios {
    id: number
    email: string
    senha: string
  }
  
export interface IDetalheUsuarios {
    id: number
    email: string
    senha: string
}
  
export type IUsuariosComTotalCount = {
    data: IListagemUsuarios[]
    totalCount: number
}