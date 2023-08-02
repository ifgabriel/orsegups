import { render } from '@testing-library/react';
import ExceptionState from '.';

describe('ExceptionState', () => {
  it('should render exceptionState component', () => {
    const { container } = render(<ExceptionState type='EMPTY' title='title' description='description' />)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild?.nodeName).toBe('DIV');
  })

  it('should render exceptionState with title and description props', () => {
    const { getByText } = render(<ExceptionState type='EMPTY' title='title' description='description' />)

    expect(getByText('title')).toBeInTheDocument()
    expect(getByText('description')).toBeInTheDocument()
  })

  it('should render exceptionState with empty type props', () => {
    const { getByTestId } = render(<ExceptionState type='EMPTY' title='title' description='description' />)

    expect(getByTestId('empty-icon')).toBeInTheDocument()
  })

  it('should render exceptionState with error type props', () => {
    const { getByTestId } = render(<ExceptionState type='ERROR' title='title' description='description' />)

    expect(getByTestId('error-icon')).toBeInTheDocument()
  })
})