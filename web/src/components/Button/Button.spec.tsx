import { fireEvent, render } from '@testing-library/react';
import Button from '.';

describe('Button', () => {
  const appearances = ['primary', 'secondary', 'negative']

  it('should render button component', () => {

    const { container } = render(<Button>Foo</Button>)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  })

  it('should render button text', () => {

    const { getByText } = render(<Button>Foo</Button>)

    expect(getByText('Foo')).toBeInTheDocument()
  })

  it('should call button click function', () => {
    const mockOnClick = vi.fn();

    const { getByText } = render(<Button onClick={mockOnClick}>Foo</Button>)

    fireEvent.click(getByText('Foo'))

    expect(mockOnClick).toHaveBeenCalled();
  })
  
  it.each(appearances)('should contain a class %s', (appearance) => {
    const { container } = render(<Button appearance={appearance}>Foo</Button>)

    expect(container.firstChild).toHaveClass(appearance);
  })
})