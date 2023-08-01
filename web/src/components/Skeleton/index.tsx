import { ComponentProps } from 'react'
import styles from './styles.module.css'

interface SkeletonProps extends ComponentProps<'div'> {
    width: string,
    height: string,
}

const Skeleton = ({width, height, ...props}: SkeletonProps) => (
    <div {...props} className={styles.Skeleton} style={{ width, height }}/>
)

export default Skeleton