import { Modal } from '@/components'
import { fireEvent, render } from '@testing-library/react'
import Form from '.'

const FormComponent = () => <Form onSubmit={() => {}} onCancel={() => {}} />

describe('Form', () => {
  it('should form component', () => {
    const { container } = render(<FormComponent />)

    const input = container.querySelector('form')

    expect(input).toBeInTheDocument()
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

    expect(getByText('Salvar')).toBeInTheDocument()
    expect(getByText('Cancelar')).toBeInTheDocument()
  })

  it('should call onCancel function', () => {
    const mockOnCancel = vi.fn()

    const { getByText } = render(
      <Modal.Root>
        <Form onSubmit={() => {}} onCancel={mockOnCancel} />
      </Modal.Root>,
    )

    fireEvent.click(getByText('Cancelar'))

    expect(mockOnCancel).toBeCalled()
  })
})
