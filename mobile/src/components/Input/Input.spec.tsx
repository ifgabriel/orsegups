import { fireEvent, render } from '@testing-library/react-native'
import Input from '.'

describe('Input', () => {
  it('should render input component', () => {
    const { getByTestId } = render(<Input label="Field" />)

    expect(getByTestId('input-element')).toBeTruthy()
  })

  it('should render input with id props', () => {
    const { getByTestId } = render(<Input id="id-foo" label="Field" />)

    expect(getByTestId('input-element').props.id).toBe('id-foo')
  })

  it('should render input label', () => {
    const { getByText } = render(<Input id="id-foo" label="Field" />)

    expect(getByText('Field')).toBeTruthy()
  })

  it('should call change input function', () => {
    const mockOnChangeText = jest.fn()
    const { getByTestId } = render(
      <Input label="Field" onChangeText={mockOnChangeText} />,
    )
    const input = getByTestId('input-element')

    fireEvent.changeText(input!, 'new value')

    expect(mockOnChangeText).toHaveBeenCalledWith('new value')
  })
})
