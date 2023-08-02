import { forwardRef } from 'react'
import { Text, TextInput, TextInputProps, View } from 'react-native'
import { styles } from './../form.styles'

interface InputProps extends TextInputProps {
  label: string
  feedback?: string
}

const Input = forwardRef<TextInput, InputProps>(
  ({ feedback, label, ...props }, ref) => (
    <View>
      <Text>{label}</Text>
      <TextInput
        style={styles.input}
        {...props}
        ref={ref}
        testID="input-element"
      />
      <Text style={styles.feedback}>{feedback}</Text>
    </View>
  ),
)

Input.displayName = 'Input'

export default Input
