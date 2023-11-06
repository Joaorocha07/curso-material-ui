export interface IListagemCidade {
    id: number
    nome: string
  }
  
export interface IDetalheCidade {
    id: number
    nome: string
}
  
export type ICidadesComTotalCount = {
    data: IListagemPessoa[]
    totalCount: number
}