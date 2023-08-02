import { fireEvent, render } from '@testing-library/react';
import Button from '.';

describe('Button', () => {
  it('should render button component', () => {
    const { container } = render(<Button>Foo</Button>)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  })

  it('should render with id props', () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(<Button onClick={mockOnClick} id='id-foo'>Foo</Button>)

    expect(getByText('Foo')).toHaveAttribute('id', 'id-foo')
  })

  it('should render button text', () => {
    const { getByText } = render(<Button>Foo</Button>)

    expect(getByText('Foo')).toBeInTheDocument()
  })

  it('should render button with className props', () => {
    const { getByText } = render(<Button className='className-foo'>Foo</Button>)

    expect(getByText('Foo')).toHaveClass('className-foo')
  })

  it('should call button click function', () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(<Button onClick={mockOnClick}>Foo</Button>)

    fireEvent.click(getByText('Foo'))

    expect(mockOnClick).toHaveBeenCalled();
  })
})