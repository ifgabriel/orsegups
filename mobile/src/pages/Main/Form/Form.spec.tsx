import { fireEvent, render } from '@testing-library/react-native'
import Form from '.'
import { Modal } from '../../../components'

const FormComponent = () => <Form onSubmit={() => {}} onCancel={() => {}} />

describe('Form', () => {
  it('should form component', () => {
    const { root } = render(<FormComponent />)

    const form = root.children[0]

    expect(form).toBeTruthy()
  })

  it('should render inputs and select', () => {
    const { getByTestId, getAllByTestId } = render(<FormComponent />)

    const inputs = getAllByTestId('input-element')
    const selects = getByTestId('select-element')

    expect(inputs.length).toBe(3)
    expect(selects).toBeTruthy()
  })

  it('should render input label', () => {
    const { getByText } = render(<FormComponent />)

    expect(getByText('Nome')).toBeTruthy()
    expect(getByText('Serial')).toBeTruthy()
    expect(getByText('MacAddress')).toBeTruthy()
    expect(getByText('Tipo')).toBeTruthy()
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
