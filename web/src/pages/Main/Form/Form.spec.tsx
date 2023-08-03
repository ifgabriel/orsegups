import { Modal } from '@/components'
import { fireEvent, render, waitFor } from '@testing-library/react'
import Form from '.'

const FormComponent = () => <Form onSubmit={() => {}} onCancel={() => {}} />

describe('Form', () => {
  it('should form component', () => {
    const { container } = render(<FormComponent />)

    const form = container.querySelector('form')

    expect(form).toBeInTheDocument()
    expect(form?.nodeName).toBe('FORM')
  })

  it('should render inputs and select', () => {
    const { container, getByText } = render(<FormComponent />)

    const inputs = container.querySelectorAll('input')
    const selects = container.querySelectorAll('select')

    expect(inputs.length).toBe(3)
    expect(selects.length).toBe(1)
    expect(getByText('Nome')).toBeInTheDocument()
    expect(getByText('Serial')).toBeInTheDocument()
    expect(getByText('MacAddress')).toBeInTheDocument()
    expect(getByText('Tipo')).toBeInTheDocument()
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

  it('should render feedback after validation', async () => {
    const { getAllByText, getByText } = render(<FormComponent />)

    fireEvent.click(getByText('Salvar'))

    await waitFor(() =>
      expect(getAllByText('O campo é obrigatório!').length).toBe(3),
    )
  })

  it('should valid macAddress mask', async () => {
    const { getByPlaceholderText, getByText } = render(<FormComponent />)

    const macAddress = getByPlaceholderText('xx:xx:xx:xx:xx:xx')

    fireEvent.change(macAddress, { target: { value: '1111' } })

    fireEvent.click(getByText('Salvar'))

    await waitFor(() =>
      expect(
        getByText('O MAC Address deve estar no formato xx:xx:xx:xx:xx:xx'),
      ).toBeInTheDocument(),
    )
  })

  it('should apply macAddress mask', () => {
    const { getByPlaceholderText } = render(<FormComponent />)

    const macAddress = getByPlaceholderText('xx:xx:xx:xx:xx:xx')

    fireEvent.change(macAddress, { target: { value: '111111111111' } })

    expect(macAddress).toHaveValue('11:11:11:11:11:11')
  })

  it('should call onSubmit function', async () => {
    const mockOnSubmit = vi.fn()

    const { getByText } = render(
      <Modal.Root>
        <Form
          defaultValues={{
            id: '1',
            name: 'New Device',
            serial: 'ND123',
            macAddress: '11:11:11:11:11:11',
            type: 'CAMERA',
          }}
          onSubmit={mockOnSubmit}
          onCancel={() => {}}
        />
      </Modal.Root>,
    )

    fireEvent.click(getByText('Salvar'))

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled())
  })
})
