import { render } from '@testing-library/react-native'
import Device from '.'
import { ModelDevice } from '../../domain'

const DeviceComponent = () => (
  <Device.Root>
    <Device.Content macAddress='00:00:00:00:00:00' name='device-name' serial='device-serial' type='SENSOR' id='1' />
    <Device.Icon type='SENSOR' />
    <Device.Actions>
      <button>Device Action</button>
    </Device.Actions>
  </Device.Root>
)

const deviceTypes = ['CAMERA', 'SENSOR', 'REMOTE_CONTROL'] as ModelDevice['type'][]

describe('Device', () => {
  it('should render device component', () => {
    const { root } = render(<DeviceComponent />)

    expect(root.children[0]).toBeTruthy()
  })

  it('should render device content', () => {
    const { getByText } = render(<DeviceComponent />)

    expect(getByText('00:00:00:00:00:00')).toBeTruthy()
    expect(getByText('device-name')).toBeTruthy()
    expect(getByText('device-serial')).toBeTruthy()
  })

  it('should render device action children', () => {
    const { getByRole } = render(<DeviceComponent />)

    expect(getByRole('button')).toBeTruthy()
  })

  it('should render device action children', () => {
    const { getByRole } = render(<DeviceComponent />)

    expect(getByRole('button')).toBeTruthy()
  })

  it.each(deviceTypes)('should render device with %s icon', (type) => {
    const { getByTestId } = render(<Device.Icon type={type} />)

    expect(getByTestId(`${type}-icon`)).toBeTruthy()
  })
})
