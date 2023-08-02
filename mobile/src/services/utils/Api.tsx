import { HttpResponse } from '../../data/protocols/http'

import { AxiosHttpClient } from '../../infra/http'

type Get = <P, R>(uri: string, params?: P) => Promise<HttpResponse<R>>
type Post = <P, R>(uri: string, data?: P) => Promise<HttpResponse<R>>
type Put = <P, R>(uri: string, data?: P) => Promise<HttpResponse<R>>
type Patch = <P, R>(uri: string, data?: P) => Promise<HttpResponse<R>>
type Delete = <R>(uri: string) => Promise<HttpResponse<R>>

function API() {
  const axios = AxiosHttpClient()
  const URL = 'http://192.168.100.64:3003'

  const get: Get = (path, params) =>
    axios.request({
      url: `${URL}${path}`,
      body: params,
      method: 'get',
    })

  const put: Put = (path, params) =>
    axios.request({
      url: `${URL}${path}`,
      body: params,
      method: 'put',
    })

  const patch: Patch = (path, params) =>
    axios.request({
      url: `${URL}${path}`,
      body: params,
      method: 'patch',
    })

  const post: Post = (path, params) =>
    axios.request({
      url: `${URL}${path}`,
      body: params,
      method: 'post',
    })

  const del: Delete = (path) =>
    axios.request({
      url: `${URL}${path}`,
      method: 'delete',
    })

  return {
    get,
    put,
    patch,
    post,
    delete: del,
  }
}

export const Api = API()
