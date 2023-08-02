import {
  ReactElement,
  cloneElement,
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
  useReducer
} from 'react'
import { Modal as ModalPrimitive, View, ViewProps } from 'react-native'
import { styles } from './styles'

interface ModalContextProps {
  open: boolean
  toggle: () => void
}

type ModalRef = {
  toggle: () => void
}

export const ModalContext = createContext({} as ModalContextProps)

const ModalProvider = forwardRef<ModalRef, ViewProps>(
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

const Content = (props: ViewProps) => {
  const { open, toggle } = useContext(ModalContext)

  return (
      <ModalPrimitive visible={open} animationType='slide' transparent={true}>
        <View style={styles.backDrop}>
          <View
            {...props}
            style={styles.content}
          />
        </View>
      </ModalPrimitive>
  )
}

const Trigger = ({ children }: { children: ReactElement }) => {
  const { toggle } = useContext(ModalContext)

  return cloneElement(children, {
    onPress: () => {
      children.props.onPress?.()
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

