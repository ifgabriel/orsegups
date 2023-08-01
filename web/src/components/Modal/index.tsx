import { joinClassNames } from '@/utils'
import {
  ComponentProps,
  MutableRefObject,
  ReactElement,
  cloneElement,
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
  useReducer,
} from 'react'
import styles from './styles.module.css'

interface ModalContextProps {
  open: boolean
  toggle: () => void
}

type ModalRef = {
  toggle: () => void
}

export const ModalContext = createContext({} as ModalContextProps)

const ModalProvider = forwardRef<ModalRef, ComponentProps<'div'>>(
  (props, ref) => {
    const [open, toggle] = useReducer((old) => !old, false)

    useImperativeHandle(ref, () => {
      return {
        toggle,
      }
    })

    return <ModalContext.Provider value={{ open, toggle }} {...props} />
  },
)

const Content = ({ className, ...props }: ComponentProps<'main'>) => {
  const { open } = useContext(ModalContext)

  return (
    !!open && (
      <div className={styles.BackDrop}>
        <main
          {...props}
          className={joinClassNames(styles.Content, className)}
        />
      </div>
    )
  )
}

const Trigger = ({ children }: { children: ReactElement }) => {
  const { toggle } = useContext(ModalContext)

  return cloneElement(children, {
    onClick: () => {
      children.props.onClick?.()
      toggle()
    },
  })
}

const Modal = {
  Root: ModalProvider,
  Content: Content,
  Trigger: Trigger,
}

export default Modal
export type { ModalRef }
