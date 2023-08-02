import { useMutation, useQueryClient } from 'react-query'

import endpoints from './endpoints'
import { Api } from './utils/Api'

import { ModelDevice } from '../domain'
import { buildUrl } from './utils'

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
