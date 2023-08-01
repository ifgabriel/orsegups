import { render } from '@testing-library/react';
import Skeleton from '.';

describe('Skeleton', () => {
  it('should render skeleton component', () => {
    const { container } = render(<Skeleton width='10px' height='25px' />)

    expect(container.firstChild?.nodeName).toBe('DIV');
  })

  it('should render skeleton with id props', () => {
    const { container } = render(<Skeleton id='id-foo' width='10px' height='25px' />)

    expect(container.firstChild).toHaveAttribute('id', 'id-foo')
  })

  it('should render skeleton label', () => {
    const { container } = render(<Skeleton id='id-foo' width='10px' height='25px' />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should render skeleton with className props', () => {
    const { container } = render(<Skeleton width='10px' height='25px' className='className-foo' />)

    expect(container.firstChild).toHaveClass('className-foo')
  })

  it('should render skeleton with width and height props', () => {
    const { container } = render(<Skeleton width='10px' height='25px'/>)

    expect(container.firstChild).toHaveStyle({ width: '10px', height: '25px' })
  })
})