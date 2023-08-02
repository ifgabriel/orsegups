import { fireEvent, render } from '@testing-library/react-native'
import Select from '.'

describe('Select', () => {
  it('should render select component', () => {
    const { getByTestId } = render(
      <Select
        label="Field"
        options={[{ label: 'Option 1', value: 'CAMERA' }]}
      />,
    )

    expect(getByTestId('select-element')).toBeTruthy()
  })

  it('should render select label props', () => {
    const { getByText } = render(
      <Select
        label="Field"
        options={[{ label: 'Option 1', value: 'CAMERA' }]}
      />,
    )

    expect(getByText('Field')).toBeTruthy()
  })

  it('should render select with options hidden', () => {
    const { queryByText } = render(
      <Select
        label="Field"
        options={[
          { label: 'Option 1', value: 'CAMERA' },
          { label: 'Option 2', value: 'SENSOR' },
        ]}
      />,
    )

    expect(queryByText('Option 2')).toBeFalsy()
  })

  it('should render select with defaultValues props', () => {
    const { getByText } = render(
      <Select
        label="Field"
        options={[
          { label: 'Option 1', value: 'CAMERA' },
          { label: 'Option 2', value: 'SENSOR' },
        ]}
        defaultValue="SENSOR"
      />,
    )

    expect(getByText('Option 2')).toBeTruthy()
  })

  it('should render select with feedback props', () => {
    const { getByText } = render(
      <Select
        label="Field"
        options={[{ label: 'Option 1', value: 'CAMERA' }]}
        feedback="Field feedback"
      />,
    )

    expect(getByText('Field feedback')).toBeTruthy()
  })

  it('should change select value', () => {
    const { getByText } = render(
      <Select
        label="Field"
        options={[
          { label: 'Option 1', value: 'CAMERA' },
          { label: 'Option 2', value: 'SENSOR' },
        ]}
      />,
    )

    expect(getByText('Option 1')).toBeTruthy()

    fireEvent.press(getByText('Option 1'))
    fireEvent.press(getByText('Option 2'))

    expect(getByText('Option 2')).toBeTruthy()
  })

  it('should hide options after selection', () => {
    const { queryByText, getByText, getAllByText } = render(
      <Select
        label="Field"
        options={[
          { label: 'Option 1', value: 'CAMERA' },
          { label: 'Option 2', value: 'SENSOR' },
        ]}
      />,
    )

    fireEvent.press(getByText('Option 1'))

    expect(getByText('Option 2')).toBeTruthy()

    fireEvent.press(getAllByText('Option 1')[1])

    expect(queryByText('Option 2')).toBeFalsy()
  })

  it('should call onChangeValue function', () => {
    const mockOnChangeValue = jest.fn()

    const { getByText } = render(
      <Select
        label="Field"
        options={[
          { label: 'Option 1', value: 'CAMERA' },
          { label: 'Option 2', value: 'SENSOR' },
        ]}
        onChangeValue={mockOnChangeValue}
      />,
    )

    fireEvent.press(getByText('Option 1'))
    fireEvent.press(getByText('Option 2'))

    expect(mockOnChangeValue).toBeCalledWith('SENSOR')
  })
})
