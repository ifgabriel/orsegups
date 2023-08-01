import { fireEvent, render } from '@testing-library/react';
import Input from '.';
import { createRef } from 'react';

describe('Input', () => {
  it('should render input component', () => {

    const { container } = render(<Input label='Field' />)

    const input = container.querySelector("input")

    expect(input).toBeInTheDocument()
    expect(input?.nodeName).toBe('INPUT');
  })

  it('should render input with id props', () => {
    const { container } = render(<Input id='id-foo' label='Field' />)

    const input = container.querySelector("input")

    expect(input).toHaveAttribute('id', 'id-foo')
  })

  it('should render input label', () => {

    const { getByText } = render(<Input id='id-foo' label='Field' />)

    expect(getByText('Field')).toBeInTheDocument()
  })

  it('should render input with className props', () => {

    const { container } = render(<Input label='Field' className='className-foo' />)

    const input = container.querySelector("input")

    expect(input).toHaveClass('className-foo')
  })

  it('should receive ref', () => {
    const inputRef = createRef<HTMLInputElement>()

    const { container } = render(<Input label='Field' ref={inputRef} />)

    const input = container.querySelector("input");

    expect(input).toBe(inputRef.current)
  })

  it('should render text typed', () => {
    const { container } = render(<Input label='Field' />)

    const input = container.querySelector("input");

    fireEvent.change(input!, { target: { value: "new value" } });

    expect(input).toHaveValue('new value')
  })

  it('should call change input function', () => {
    const mockOnChange = vi.fn();

    const { container } = render(<Input label='Field' onChange={mockOnChange} />)

    const input = container.querySelector("input");

    fireEvent.change(input!, { target: { value: "new value" } });

    expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        value: "new value"
      })
    }));
  })
})