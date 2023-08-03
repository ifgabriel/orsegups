import { ComponentProps, forwardRef } from 'react'

import { joinClassNames } from '@/utils'
import styles from './../form.module.css'

interface InputProps extends ComponentProps<'input'> {
  label: string
  feedback?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, feedback, label, ...props }, ref) => (
    <div>
      <label>{label}</label>
      <input
        className={joinClassNames(styles.Input, className)}
        {...props}
        ref={ref}
      />
      <p className={styles.Feedback}>{feedback}</p>
    </div>
  ),
)

Input.displayName = 'Input'

export default Input
