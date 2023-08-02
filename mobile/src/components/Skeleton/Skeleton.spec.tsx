import { render, screen } from '@testing-library/react-native'
import Skeleton from '.'

describe('Skeleton', () => {
  it('should render skeleton component', () => {
    render(<Skeleton width={10} height={25} />)

    expect(screen.getByTestId('skeleton-element')).toBeTruthy()
  })

  it('should render skeleton with id props', () => {
    render(<Skeleton id="id-foo" width={10} height={25} />)

    expect(screen.getByTestId('skeleton-element')).toBeTruthy()
  })

  it('should render skeleton with width and height props', () => {
    const { getByTestId } = render(<Skeleton width={10} height={25} />)

    expect(getByTestId('skeleton-element').props.style[1].width).toBe(10)
    expect(getByTestId('skeleton-element').props.style[1].height).toBe(25)
  })
})
