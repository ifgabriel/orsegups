import { FileWarning, X } from 'lucide-react-native'
import { Text, View } from 'react-native'
import { styles } from './styles'

interface ExceptionStateProps {
  title: string
  description: string
  type: 'error' | 'empty'
}

const ExceptionState = ({ title, description, type }: ExceptionStateProps) => (
  <View style={styles.exceptionState} testID="exceptionState-element">
    <View style={styles.icon}>
      {type === 'error' ? <X /> : <FileWarning />}
    </View>
    <View>
      <Text>{title}</Text>
      <Text>{description}</Text>
    </View>
  </View>
)

export default ExceptionState
