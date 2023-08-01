import { joinClassNames } from '@/utils'
import { ComponentProps } from 'react'
import styles from './styles.module.css'

interface ButtonProps extends   ComponentProps<'button'> {
    appearance?: 'primary' | 'secondary' | 'negative'
}

const Button = ({ className, appearance = 'primary', ...props}: ButtonProps) => (
    <button className={joinClassNames(styles.Button, className, styles[appearance])} {...props} />
)

export default Button