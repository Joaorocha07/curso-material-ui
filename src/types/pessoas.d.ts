export interface IListagemPessoa {
    id: number
    email: string
    cidadeId: number
    nomeCompleto: string
  }
  
export interface IDetalhePessoa {
    id: number
    email: string
    cidadeId: number
    nomeCompleto: string
}
  
export type IPessoasComTotalCount = {
    data: IListagemPessoa[]
    totalCount: number
}