import { Pressable, PressableProps, Text } from 'react-native'
import { styles } from './styles'

interface ButtonProps extends PressableProps {
  children: string,
}

const Button = ({ children, ...props }: ButtonProps) => (
  <Pressable style={styles.button} {...props}>
    <Text style={styles.text}>{children}</Text>
  </Pressable>
)

export default Button
