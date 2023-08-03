import { useMutation, useQueryClient } from 'react-query'

import { ModelDevice } from '@/domain'

import endpoints from './endpoints'
import { Api } from './utils/Api'

const useCreateDevice = () => {
  const client = useQueryClient()

  return useMutation(
    (params: Omit<ModelDevice, 'id'>) => {
      return Api.post(endpoints.createDevice, params)
    },
    {
      onSuccess: () => {
        client.invalidateQueries('fetch-devices')
      },
    },
  )
}

export default useCreateDevice
