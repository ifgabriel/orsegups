import { useEffect, useRef } from 'react'
import { Animated, DimensionValue, ViewProps } from 'react-native'
import { styles } from './styles'

interface SkeletonProps extends ViewProps {
    width: DimensionValue,
    height: DimensionValue,
}

const Skeleton = ({ width, height, ...props }: SkeletonProps) => {
    const opacityValue = useRef(new Animated.Value(0.5)).current

    const handleAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacityValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityValue, {
                    toValue: 0.5,
                    duration: 1000,
                    useNativeDriver: false,
                }),
            ])
        ).start()
    }

    useEffect(() => handleAnimation(), [])

    return (
        <Animated.View {...props} style={[styles.skeleton, { opacity: opacityValue, width, height }]} />
    )
}


export default Skeleton