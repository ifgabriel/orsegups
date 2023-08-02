import { joinClassNames } from '@/utils'
import { ComponentProps } from 'react'
import styles from './styles.module.css'

const Button = ({ className, ...props}: ComponentProps<'button'>) => (
    <button className={joinClassNames(styles.Button, className)} {...props} />
)

export default Button