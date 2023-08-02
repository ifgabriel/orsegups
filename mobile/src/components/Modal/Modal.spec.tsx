import { fireEvent, render } from '@testing-library/react-native'
import { Button, Text } from 'react-native'
import Modal from '.'

const ModalComponent = () => (
  <Modal.Root>
    <Modal.Trigger>
      <Button title="Open" />
    </Modal.Trigger>
    <Modal.Content>
      <Text>Content</Text>
      <Modal.Trigger>
        <Button title="Close" />
      </Modal.Trigger>
    </Modal.Content>
  </Modal.Root>
)

describe('Modal', () => {
  it('should render modal component', () => {
    const { queryByTestId, getByText } = render(<ModalComponent />)

    expect(getByText('Open')).toBeTruthy()
    expect(queryByTestId('modal-content-element')).toBeFalsy()
  })

  it('should open content modal component', () => {
    const { getByTestId, getByText } = render(<ModalComponent />)

    fireEvent.press(getByText('Open'))

    expect(getByText('Content')).toBeTruthy()
    expect(getByTestId('modal-content-element')).toBeTruthy()
  })

  it('should close content modal component', () => {
    const { queryByTestId, getByText } = render(<ModalComponent />)

    fireEvent.press(getByText('Open'))
    fireEvent.press(getByText('Close'))

    expect(getByText('Open')).toBeTruthy()
    expect(queryByTestId('modal-content-element')).toBeFalsy()
  })

  it('should call onPress trigger', () => {
    const mockOnPress = jest.fn()

    const { getByText } = render(
      <Modal.Root>
        <Modal.Trigger>
          <Button title="Trigger" onPress={mockOnPress} />
        </Modal.Trigger>
      </Modal.Root>,
    )

    fireEvent.press(getByText('Trigger'))

    expect(mockOnPress).toBeCalled()
  })
})
