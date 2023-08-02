import { useMutation, useQueryClient } from 'react-query'

import endpoints from './endpoints'
import { Api } from './utils/Api'

import { ModelDevice } from '@/domain'

const useCreateDevice = () => {
  const client = useQueryClient()

  return useMutation(({ id, ...params }: ModelDevice) => {

    return Api.post(endpoints.createDevice, params)
  },
    {
      onSuccess: () => {
        client.invalidateQueries('fetch-devices')
      }
    }
  )
}

export default useCreateDevice
