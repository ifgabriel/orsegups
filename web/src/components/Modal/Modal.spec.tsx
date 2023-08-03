import { fireEvent, render } from '@testing-library/react'
import Modal from '.'

const ModalComponent = () => (
  <Modal.Root>
    <Modal.Trigger>
      <button type="button">Open</button>
    </Modal.Trigger>
    <Modal.Content>
      <h1>Content</h1>
      <Modal.Trigger>
        <button type="button">Close</button>
      </Modal.Trigger>
    </Modal.Content>
  </Modal.Root>
)

describe('Modal', () => {
  it('should render modal component', () => {
    const { queryByTestId, getByText } = render(<ModalComponent />)

    expect(getByText('Open')).toBeInTheDocument()
    expect(queryByTestId('modal-element')).not.toBeInTheDocument()
  })

  it('should open content modal component', () => {
    const { getByTestId, getByText } = render(<ModalComponent />)

    fireEvent.click(getByText('Open'))

    expect(getByText('Content')).toBeInTheDocument()
    expect(getByTestId('modal-element')).toBeInTheDocument()
  })

  it('should close content modal component', () => {
    const { queryByTestId, getByText } = render(<ModalComponent />)

    fireEvent.click(getByText('Open'))
    fireEvent.click(getByText('Close'))

    expect(getByText('Open')).toBeInTheDocument()
    expect(queryByTestId('modal-element')).not.toBeInTheDocument()
  })

  it('should call onClick trigger', () => {
    const mockOnClick = vi.fn()

    const { getByText } = render(
      <Modal.Root>
        <Modal.Trigger>
          <button onClick={mockOnClick}>Trigger</button>
        </Modal.Trigger>
      </Modal.Root>,
    )

    fireEvent.click(getByText('Trigger'))

    expect(mockOnClick).toBeCalled()
  })

  it('should render content with className props', () => {
    const { getByTestId, getByText } = render(
      <Modal.Root>
        <Modal.Trigger>
          <button>Trigger</button>
        </Modal.Trigger>
        <Modal.Content className="className-foo">
          <h1>Content</h1>
        </Modal.Content>
      </Modal.Root>,
    )

    fireEvent.click(getByText('Trigger'))
    expect(getByTestId('modal-element')).toHaveClass('className-foo')
  })

  it('should render content with id props', () => {
    const { getByTestId, getByText } = render(
      <Modal.Root>
        <Modal.Trigger>
          <button>Trigger</button>
        </Modal.Trigger>
        <Modal.Content id="id-foo">
          <h1>Content</h1>
        </Modal.Content>
      </Modal.Root>,
    )

    fireEvent.click(getByText('Trigger'))
    expect(getByTestId('modal-element')).toHaveAttribute('id', 'id-foo')
  })
})
