import { render } from '@testing-library/react'
import Main from '.'
import {
  useCreateDevice,
  useDeleteDevice,
  useEditDevice,
  useFetchDevices,
} from './../../services'

vi.mock('./../../services')

const mockedUseFetchDevices = useFetchDevices as jest.Mock
const mockedUseEditDevice = useEditDevice as jest.Mock
const mockedUseCreateDevice = useCreateDevice as jest.Mock
const mockedUseDeleteDevice = useDeleteDevice as jest.Mock

describe('Main page', () => {
  beforeAll(() => {
    mockedUseEditDevice.mockImplementation(() => ({
      mutate: vi.fn(),
    }))

    mockedUseCreateDevice.mockImplementation(() => ({
      mutate: vi.fn(),
    }))

    mockedUseDeleteDevice.mockImplementation(() => ({
      mutate: vi.fn(),
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

    const { container } = render(<Main />)
    const skeleton = container.querySelector('ul > div')
    expect(skeleton).toHaveStyle('height: 137px')
  })

  it('should render error state', () => {
    mockedUseFetchDevices.mockImplementation(() => ({
      data: undefined,
      isFetched: true,
    }))

    const { getByText } = render(<Main />)

    expect(
      getByText('Tivemos um problema, tente novamente mais tarde!'),
    ).toBeTruthy()
  })

  it('should render empty state', () => {
    mockedUseFetchDevices.mockImplementation(() => ({
      data: [],
      isFetched: true,
    }))

    const { getByText } = render(<Main />)

    expect(getByText('Nenhum dispositivo cadastrado!')).toBeTruthy()
  })
})
