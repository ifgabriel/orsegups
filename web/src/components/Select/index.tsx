import { ComponentProps, forwardRef } from 'react'

import { joinClassNames } from '@/utils'
import styles from './../form.module.css'

interface InputProps extends ComponentProps<'select'> {
  label: string
}

const Select = forwardRef<HTMLSelectElement, InputProps>(
  ({ className, label, ...props }, ref) => (
    <div>
      <label>{label}</label>
      <select
        className={joinClassNames(styles.Input, className)}
        {...props}
        ref={ref}
      />
    </div>
  ),
)

Select.displayName = 'Select'

export default Select
