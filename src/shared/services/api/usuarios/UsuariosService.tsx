/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { Enviroment } from '@/shared/environment'
import { Api } from '../axios-config'
import { IDetalheUsuarios, IUsuariosComTotalCount } from '@/types/usuarios'

const getAll = async (page = 1, filter = ''): Promise<IUsuariosComTotalCount | Error> => {
  try {
    const urlRelativa = `/usuarios?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`

    const { data, headers } = await Api.get(urlRelativa)

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Enviroment.LIMITE_DE_LINHAS)
      }
    }

    return new Error('Erro ao listar os registros!')
  } catch (error) {
    console.error(error)
    return new Error((error as {message : string}).message || 'Erro ao listar os registros!')
  }
}

const getById = async (id: number): Promise<IDetalheUsuarios | Error> => {
  try {
    const { data } = await Api.get(`/usuarios/${id}`)

    if (data) {
      return data
    }

    return new Error('Erro ao consultar o registro!')
  } catch (error) {
    console.error(error)
    return new Error((error as {message : string}).message || 'Erro ao consultar o registro!')
  }   
}

const create = async (dados : Omit<IDetalheUsuarios, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheUsuarios>('/usuarios', dados)

    if (data) {
      return data.id
    }

    return new Error('Erro ao criar o registro!')
  } catch (error) {
    console.error(error)
    return new Error((error as {message : string}).message || 'Erro ao criar o registro!')
  }  
}

const updateById = async (id : number, dados : IDetalheUsuarios): Promise<void | Error> => {
  try {
    const { data } = await Api.put(`/usuarios/${id}`, dados)
  } catch (error) {
    console.error(error)
    return new Error((error as {message : string}).message || 'Erro ao editar o registro!')
  }
}

const deleteById = async (id : number): Promise<void | Error> => {
  try {
    const { data } = await Api.delete(`/usuarios/${id}`)
  } catch (error) {
    console.error(error)
    return new Error((error as {message : string}).message || 'Erro ao deletar o registro!')
  }
}

export const UsuariosService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}