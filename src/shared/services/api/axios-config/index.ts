/* eslint-disable max-len */
import axios from 'axios'
import { 
  responseInterceptor 
} from './interceptors/ResponseInterceptor'
import { 
  errorInterceptor 
} from './interceptors/ErrorInterceptor'
import { Enviroment } from '@/shared/environment'

const Api = axios.create({
  baseURL: Enviroment.URL_BASE
})

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
)

export { Api }

