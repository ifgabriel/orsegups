import { DimensionValue, View, ViewProps } from 'react-native'
import { styles } from './styles'

interface SkeletonProps extends ViewProps {
  width: DimensionValue
  height: DimensionValue
}

const Skeleton = ({ width, height, ...props }: SkeletonProps) => (
  <View
    {...props}
    style={[styles.skeleton, { width, height }]}
    testID="skeleton-element"
  />
)

export default Skeleton
