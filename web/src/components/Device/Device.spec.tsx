import { ModelDevice } from '@/domain'
import { render } from '@testing-library/react'
import Device from '.'

const device: ModelDevice = {
  macAddress: '00:00:00:00:00:00',
  name: 'device-name',
  serial: 'device-serial',
  type: 'SENSOR',
  id: '1',
}

const deviceTypes = [
  'CAMERA',
  'SENSOR',
  'REMOTE_CONTROL',
] as ModelDevice['type'][]

const DeviceComponent = () => (
  <Device.Root>
    <Device.Content device={device} />
    <Device.Icon type="SENSOR" />
    <Device.Actions>
      <button>Device Action</button>
    </Device.Actions>
  </Device.Root>
)

describe('Device', () => {
  it('should render device component', () => {
    const { container } = render(<DeviceComponent />)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild?.nodeName).toBe('LI')
  })

  it('should render device content', () => {
    const { getByText } = render(<DeviceComponent />)

    expect(getByText('00:00:00:00:00:00')).toBeInTheDocument()
    expect(getByText('device-name')).toBeInTheDocument()
    expect(getByText('device-serial')).toBeInTheDocument()
  })

  it('should render DeviceContent with id props', () => {
    const { container } = render(<Device.Content id="id-foo" device={device} />)

    expect(container.firstChild).toHaveAttribute('id', 'id-foo')
  })

  it('should render DeviceContent with className props', () => {
    const { container } = render(
      <Device.Content className="className-foo" device={device} />,
    )

    expect(container.firstChild).toHaveClass('className-foo')
  })

  it('should render DeviceActions children', () => {
    const { getByRole } = render(<DeviceComponent />)

    expect(getByRole('button')).toBeInTheDocument()
  })

  it('should render DeviceActions with id props', () => {
    const { container } = render(
      <Device.Actions id="id-foo">
        <button>Device Action</button>
      </Device.Actions>,
    )

    expect(container.firstChild).toHaveAttribute('id', 'id-foo')
  })

  it('should render DeviceActions with className props', () => {
    const { container } = render(
      <Device.Actions className="className-foo">
        <button>Device Action</button>
      </Device.Actions>,
    )

    expect(container.firstChild).toHaveClass('className-foo')
  })

  it.each(deviceTypes)('should render device with %s icon', (type) => {
    const { getByTestId } = render(<Device.Icon type={type} />)

    expect(getByTestId(`${type}-icon`)).toBeInTheDocument()
  })

  it('should render DeviceIcon with id props', () => {
    const { container } = render(<Device.Icon type="SENSOR" id="id-foo" />)

    expect(container.firstChild).toHaveAttribute('id', 'id-foo')
  })

  it('should render DeviceIcon with className props', () => {
    const { container } = render(
      <Device.Icon type="SENSOR" className="className-foo" />,
    )

    expect(container.firstChild).toHaveClass('className-foo')
  })
})
