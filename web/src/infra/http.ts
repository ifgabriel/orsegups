import axios, { AxiosResponse } from 'axios'
import { HttpRequest, HttpResponse, HttpClient } from '../data/protocols/http'

export function AxiosHttpClient(): HttpClient {
  const instance = axios.create()

  const request = async (data: HttpRequest): Promise<HttpResponse> => {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await instance.request({
        url: data.url,
        data: data.body,
        method: data.method,
        headers: data.headers,
      })
    } catch (error) {
      axiosResponse = error.response
    }

    axiosResponse.status === 401

    return {
      statusCode: axiosResponse.status,
      data: axiosResponse.data,
    }
  }

  return { request }
}
