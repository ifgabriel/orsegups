import { joinClassNames } from "@/utils";
import { ComponentProps, forwardRef } from 'react';
import styles from './../form.module.css';

interface InputProps extends ComponentProps<'input'> {
    label: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, ...props }, ref) => (
    <div>
        <label>{label}</label>
        <input className={joinClassNames(styles.Input, className)} {...props} ref={ref} />
    </div>
))

export default Input