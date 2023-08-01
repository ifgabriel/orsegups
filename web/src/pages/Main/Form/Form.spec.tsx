import { fireEvent, render } from '@testing-library/react';
import Form from '.';

describe('Form', () => {
  it('should form component', () => {

    const { container } = render(<Form onSubmit={() => {}} />)

    const input = container.querySelector("form")

    expect(input).toBeInTheDocument()
    expect(input?.nodeName).toBe('FORM');
  })

  it('should render inputs and select', () => {
    const { container } = render(<Form onSubmit={() => {}} />)

    const inputs = container.querySelectorAll("input")
    const selects = container.querySelectorAll("select")

    expect(inputs.length).toBe(3)
    expect(selects.length).toBe(1)
  })

  it('should render buttons', () => {
    const { getByText } = render(<Form onSubmit={() => {}} />)

    expect(getByText('Salvar')).toBeInTheDocument()
    expect(getByText('Cancelar')).toBeInTheDocument()
  })

  it('should call onSubmit function', () => {
    const mockOnSubmit = vi.fn()
    const { getByText } = render(<Form onSubmit={mockOnSubmit} />)

    fireEvent.click(getByText('Salvar'))
    
    expect(mockOnSubmit).toBeCalled()
  })
})