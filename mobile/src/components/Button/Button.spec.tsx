import { fireEvent, render } from '@testing-library/react-native'
import Button from '.'

describe('Button', () => {
  it('should render button component', () => {
    const { getByText } = render(<Button>Foo</Button>)

    expect(getByText('Foo')).toBeTruthy()
  })

  it('should render with id props', () => {
    const mockOnPress = jest.fn()
    const { root } = render(<Button onPress={mockOnPress} id='id-foo'>Foo</Button>)

    expect(root.parent?.props.id).toEqual('id-foo')
  })

  it('should call button click function', () => {
    const mockOnPress = jest.fn()
    const { getByText } = render(<Button onPress={mockOnPress}>Foo</Button>)

    fireEvent.press(getByText('Foo'))

    expect(mockOnPress).toHaveBeenCalled()
  })
})