import { fireEvent, render } from '@testing-library/react'
import Select from '.'
import { createRef } from 'react'

describe('Select', () => {
  it('should render select component', () => {
    const { container } = render(
      <Select label="Field">
        <option value="value-1">Option 1</option>
      </Select>,
    )

    const select = container.querySelector('select')

    expect(select).toBeInTheDocument()
    expect(select?.nodeName).toBe('SELECT')
  })

  it('should render select with id props', () => {
    const { container } = render(
      <Select id="id-foo" label="Field">
        <option value="value-1">Option 1</option>
      </Select>,
    )

    const select = container.querySelector('select')

    expect(select).toHaveAttribute('id', 'id-foo')
  })

  it('should render select label', () => {
    const { getByText } = render(
      <Select id="id-foo" label="Field">
        <option value="value-1">Option 1</option>
      </Select>,
    )

    expect(getByText('Field')).toBeInTheDocument()
  })

  it('should render select with className props', () => {
    const { container } = render(
      <Select label="Field" className="className-foo">
        <option value="value-1">Option 1</option>
      </Select>,
    )

    const select = container.querySelector('select')

    expect(select).toHaveClass('className-foo')
  })

  it('should receive ref', () => {
    const selectRef = createRef<HTMLSelectElement>()

    const { container } = render(
      <Select label="Field" ref={selectRef}>
        <option value="value-1">Option 1</option>
      </Select>,
    )

    const select = container.querySelector('select')

    expect(select).toBe(selectRef.current)
  })

  // it('should change select function', () => {
  //   const mockOnSelect = vi.fn()

  //   const { container } = render(
  //     <Select label="Field" onSelect={mockOnSelect}>
  //       <option value="value-1">Option 1</option>
  //     </Select>,
  //   )

  //   const select = container.querySelector('select')
  //   const option = container.querySelector('option')

  //   fireEvent.click(select!)
  //   fireEvent.click(option!)

  //   expect(option?.selected).toBeTruthy();
  //   expect(mockOnSelect).toHaveBeenCalled()
  // })

  it('should change select value', () => {
    const { container } = render(
      <Select label="Field">
        <option value="value-1">Option 1</option>
        <option value="value-2">Option 2</option>
      </Select>,
    )

    const select = container.querySelector('select')
    const options = container.querySelectorAll('option')

    fireEvent.click(select!)
    fireEvent.click(options[0]!)

    expect(options[0]?.selected).toBeTruthy();
    expect(options[1]?.selected).toBeFalsy();
    expect(select).toHaveValue('value-1')
  })
})
