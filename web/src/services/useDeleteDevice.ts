import { useMutation, useQueryClient } from 'react-query'

import { ModelDevice } from '@/domain'
import endpoints from './endpoints'
import { buildUrl } from './utils'
import { Api } from './utils/Api'

const useDeleteDevice = () => {
  const client = useQueryClient()

  return useMutation((id: ModelDevice['id']) => {
    const path = buildUrl({ route: endpoints.deleteDevice, params: { id } })

    return Api.delete(path)
  },
    {
      onSuccess: () => {
        client.invalidateQueries('fetch-devices')
      }
    }
  )
}

export default useDeleteDevice
