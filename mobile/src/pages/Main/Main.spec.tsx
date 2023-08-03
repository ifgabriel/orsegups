import { render } from '@testing-library/react-native'
import Main from '.'
import {
  useCreateDevice,
  useDeleteDevice,
  useEditDevice,
  useFetchDevices,
} from './../../services'

jest.mock('./../../services')

const mockedUseFetchDevices = useFetchDevices as jest.Mock
const mockedUseEditDevice = useEditDevice as jest.Mock
const mockedUseCreateDevice = useCreateDevice as jest.Mock
const mockedUseDeleteDevice = useDeleteDevice as jest.Mock

describe('Main page', () => {
  beforeAll(() => {
    mockedUseEditDevice.mockImplementation(() => ({
      mutate: jest.fn(),
    }))

    mockedUseCreateDevice.mockImplementation(() => ({
      mutate: jest.fn(),
    }))

    mockedUseDeleteDevice.mockImplementation(() => ({
      mutate: jest.fn(),
    }))
  })

  it('should render main component', () => {
    mockedUseFetchDevices.mockImplementation(() => ({
      data: [],
      isFetched: true,
    }))

    const { getByText } = render(<Main />)

    expect(getByText('Dispositivos')).toBeTruthy()
  })

  it('should render view state', () => {
    mockedUseFetchDevices.mockImplementation(() => ({
      data: [
        {
          id: '1',
          name: 'Device 1',
          serial: 'serial1',
          macAddress: '11:11:11:11:11:11',
          type: 'CAMERA',
        },
      ],
      isFetched: true,
    }))

    const { getByText } = render(<Main />)

    expect(getByText('Device 1')).toBeTruthy()
    expect(getByText('serial1')).toBeTruthy()
    expect(getByText('11:11:11:11:11:11')).toBeTruthy()
  })

  it('should render loading state', () => {
    mockedUseFetchDevices.mockImplementation(() => ({
      data: undefined,
      isFetched: false,
    }))

    const { getAllByTestId } = render(<Main />)

    expect(getAllByTestId('skeleton-element')).toHaveLength(10)
  })

  it('should render error state', () => {
    mockedUseFetchDevices.mockImplementation(() => ({
      data: undefined,
      isFetched: true,
    }))

    const { getByTestId } = render(<Main />)

    expect(getByTestId('exceptionState-element-error')).toBeTruthy()
  })

  it('should render empty state', () => {
    mockedUseFetchDevices.mockImplementation(() => ({
      data: [],
      isFetched: true,
    }))

    const { getByTestId } = render(<Main />)

    expect(getByTestId('exceptionState-element-empty')).toBeTruthy()
  })
})
