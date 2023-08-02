import { fireEvent, render } from '@testing-library/react'
import Modal from '.'

const ModalComponent = () => (
  <Modal.Root>
    <Modal.Trigger>
      <button type='button'>Open</button>
    </Modal.Trigger>
    <Modal.Content>
      <h1>Content</h1>
      <Modal.Trigger>
        <button type='button'>Close</button>
      </Modal.Trigger>
    </Modal.Content>
  </Modal.Root>
)

describe('Modal', () => {
  it('should render modal component', () => {
    const { container, getByText } = render(<ModalComponent />)

    expect(getByText('Open')).toBeInTheDocument()
    expect(container.querySelector('main')).not.toBeInTheDocument()
  })

  it('should open content modal component', () => {
    const { container, getByText } = render(<ModalComponent />)

    fireEvent.click(getByText('Open'))

    expect(getByText('Content')).toBeInTheDocument()
    expect(container.querySelector('main')).toBeInTheDocument()
  })

  it('should close content modal component', () => {
    const { container, getByText } = render(<ModalComponent />)

    fireEvent.click(getByText('Open'))
    fireEvent.click(getByText('Close'))

    expect(getByText('Open')).toBeInTheDocument()
    expect(container.querySelector('main')).not.toBeInTheDocument()
  })

  it('should call onPress trigger', () => {
    const mockOnPress = vi.fn()

    const { getByText } = render(
      <Modal.Root>
        <Modal.Trigger>
          <button onPress={mockOnPress}>
            Trigger
          </button>
        </Modal.Trigger>
      </Modal.Root>,
    )

    fireEvent.click(getByText('Trigger'))

    expect(mockOnPress).toBeCalled()
  })

  it('should render content with className props', () => {
    const { container, getByText } = render(
      <Modal.Root>
         <Modal.Trigger>
          <button>
            Trigger
          </button>
        </Modal.Trigger>
        <Modal.Content className='className-foo'>
          <h1>Content</h1>
        </Modal.Content>
      </Modal.Root>,
    )
    
    fireEvent.click(getByText('Trigger'))
    expect(container.querySelector('main')).toHaveClass('className-foo')
  })

  it('should render content with id props', () => {
    const { container, getByText } = render(
      <Modal.Root>
         <Modal.Trigger>
          <button>
            Trigger
          </button>
        </Modal.Trigger>
        <Modal.Content id='id-foo'>
          <h1>Content</h1>
        </Modal.Content>
      </Modal.Root>,
    )
    
    fireEvent.click(getByText('Trigger'))
    expect(container.querySelector('main')).toHaveAttribute('id', 'id-foo')
  })
})
