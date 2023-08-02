import { FileWarning, X } from 'lucide-react-native'
import { Text, View } from 'react-native'
import { styles } from './styles'

interface ExceptionStateProps {
  title: string,
  description: string,
  type: 'ERROR' | 'EMPTY'
}

const ExceptionState = ({ title, description, type }: ExceptionStateProps) => (
  <View style={styles.exceptionState}>
    <View style={styles.icon}>
      {type === 'ERROR'
        ? <X data-testid='error-icon' />
        : <FileWarning data-testid='empty-icon' />
      }
    </View>
    <View>
      <Text>
        {title}
      </Text>
      <Text>
        {description}
      </Text>
    </View>
  </View>
)

export default ExceptionState
