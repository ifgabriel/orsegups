import { ComponentProps } from 'react'
import styles from './styles.module.css'
import { joinClassNames } from '@/utils'

interface SkeletonProps extends ComponentProps<'div'> {
    width: string,
    height: string,
}

const Skeleton = ({width, height, className, ...props}: SkeletonProps) => (
    <div {...props} className={joinClassNames(styles.Skeleton, className)} style={{ width, height }}/>
)

export default Skeleton