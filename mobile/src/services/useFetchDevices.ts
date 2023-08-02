import { useQuery } from 'react-query'

import { RemoteDevice } from '../data'
import endpoints from './endpoints'
import { Api } from './utils/Api'

const useFetchDevices = () =>
  useQuery(['fetch-devices'], () => {
    return Api.get<string, RemoteDevice[]>(endpoints.fetchDevices).then(
      ({ data }) => data,
    )
  })

export default useFetchDevices
