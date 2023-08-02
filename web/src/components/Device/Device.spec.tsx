import { ModelDevice } from '@/domain';
import { render } from '@testing-library/react';
import Device from '.';

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
    const { container } = render(<DeviceComponent />)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild?.nodeName).toBe('LI');
  })

  it('should render device content', () => {
    const { getByText } = render(<DeviceComponent />)

    expect(getByText('00:00:00:00:00:00')).toBeInTheDocument()
    expect(getByText('device-name')).toBeInTheDocument()
    expect(getByText('device-serial')).toBeInTheDocument()
  })

  it('should render device action children', () => {
    const { getByRole } = render(<DeviceComponent />)

    expect(getByRole('button')).toBeInTheDocument()
  })

  it('should render device action children', () => {
    const { getByRole } = render(<DeviceComponent />)

    expect(getByRole('button')).toBeInTheDocument()
  })

  it.each(deviceTypes)('should render device with %s icon', (type) => {
    const { getByTestId } = render(<Device.Icon type={type} />)

    expect(getByTestId(`${type}-icon`)).toBeInTheDocument()
  })
})
