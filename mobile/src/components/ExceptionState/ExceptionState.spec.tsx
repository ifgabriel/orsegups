import { render } from '@testing-library/react-native'
import ExceptionState from '.'

describe('ExceptionState', () => {
  it('should render exceptionState component', () => {
    const { getByTestId } = render(
      <ExceptionState type="empty" title="title" description="description" />,
    )

    expect(getByTestId('exceptionState-element')).toBeTruthy()
  })

  it('should render exceptionState with title and description props', () => {
    const { getByText } = render(
      <ExceptionState type="empty" title="title" description="description" />,
    )

    expect(getByText('title')).toBeTruthy()
    expect(getByText('description')).toBeTruthy()
  })
})
