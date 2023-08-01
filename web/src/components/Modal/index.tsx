import { joinClassNames } from '@/utils'
import { ComponentProps, ReactElement, cloneElement, createContext, useContext, useReducer } from 'react'
import styles from './styles.module.css'

interface ModalContextProps {
    open: boolean,
    toggle: () => void
}

export const ModalContext = createContext({} as ModalContextProps)

const ModalProvider = (props: ComponentProps<'div'>) => {
    const [open, toggle] = useReducer((old) => !old, false)

    return (
        <ModalContext.Provider value={{ open, toggle }} {...props} />
    )
}

const Content = ({ className, ...props }: ComponentProps<'main'>) => {
    const { open } = useContext(ModalContext)

    return !!open && (
        <div className={styles.BackDrop}>
            <main {...props} className={joinClassNames(styles.Content, className)} />
        </div>
    )
}

const Trigger = ({ children }: { children: ReactElement }) => {
    const { toggle } = useContext(ModalContext)

    return cloneElement(children, {
        onClick: () => {
            children.props.onClick?.()
            toggle()
        }
    })
}

const Modal = {
    Root: ModalProvider,
    Content: Content,
    Trigger: Trigger,
}

export default Modal