import { fireEvent, render } from '@testing-library/react-native'
import Form from '.'
import { Modal } from '../../../components'

const FormComponent = () => <Form onSubmit={() => {}} onCancel={() => {}} />

describe('Form', () => {
  it('should form component', () => {
    const { container } = render(<FormComponent />)

    const input = container.querySelector('form')

    expect(input).toBeTruthy()
    expect(input?.nodeName).toBe('FORM')
  })

  it('should render inputs and select', () => {
    const { container } = render(<FormComponent />)

    const inputs = container.querySelectorAll('input')
    const selects = container.querySelectorAll('select')

    expect(inputs.length).toBe(3)
    expect(selects.length).toBe(1)
  })

  it('should render buttons', () => {
    const { getByText } = render(<FormComponent />)

    expect(getByText('Salvar')).toBeTruthy()
    expect(getByText('Cancelar')).toBeTruthy()
  })

  it('should call onCancel function', () => {
    const mockOnCancel = jest.fn()

    const { getByText } = render(
      <Modal.Root>
        <Form onSubmit={() => {}} onCancel={mockOnCancel} />
      </Modal.Root>,
    )

    fireEvent.press(getByText('Cancelar'))

    expect(mockOnCancel).toBeCalled()
  })
})
