import { joinClassNames } from '@/utils'
import {
  ComponentProps,
  ReactElement,
  cloneElement,
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
  useReducer,
} from 'react'
import { createPortal } from 'react-dom'
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

ModalProvider.displayName = 'ModalProvider'

const Content = ({ className, ...props }: ComponentProps<'main'>) => {
  const { open } = useContext(ModalContext)

  return (
    !!open &&
    createPortal(
      <div className={styles.BackDrop}>
        <main
          {...props}
          data-testid="modal-element"
          className={joinClassNames(styles.Content, className)}
        />
      </div>,
      document.body,
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
  Content,
  Trigger,
}

export default Modal
export type { ModalRef }

