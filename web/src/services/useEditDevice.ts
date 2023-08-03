import { useMutation, useQueryClient } from 'react-query'

import { ModelDevice } from '@/domain'

import endpoints from './endpoints'
import { buildUrl } from './utils'
import { Api } from './utils/Api'

const useEditDevice = () => {
  const client = useQueryClient()

  return useMutation(
    ({ id, ...params }: ModelDevice) => {
      const path = buildUrl({ route: endpoints.editDevice, params: { id } })

      return Api.patch(path, params)
    },
    {
      onSuccess: () => {
        client.invalidateQueries('fetch-devices')
      },
    },
  )
}

export default useEditDevice
