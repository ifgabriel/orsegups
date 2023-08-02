import React, { useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { ModelDevice } from '../../domain'
import { styles } from './styles'

type OptionType = {
  label: string
  value: ModelDevice['type']
}

interface SelectProps {
  label: string
  options: OptionType[]
  feedback?: string
  defaultValue?: ModelDevice['type']
  onChangeValue?: (value: ModelDevice['type']) => void
}

const SelectComponent = ({
  label,
  feedback,
  onChangeValue,
  options,
  defaultValue,
}: SelectProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultValue ?? options[0].value,
  )

  const handleOptionSelect = (value: ModelDevice['type']) => {
    setSelectedValue(value)
    onChangeValue?.(value)
    setModalVisible(false)
  }

  return (
    <View>
      <Text>{label}</Text>
      <TouchableOpacity
        style={styles.input}
        testID="select-element"
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectButtonText}>
          {options.filter((option) => option.value === selectedValue)[0]?.label}
        </Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.backDrop}>
          <View style={styles.content}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.option}
                onPress={() => handleOptionSelect(option.value)}
              >
                <Text>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      <Text style={styles.feedback}>{feedback}</Text>
    </View>
  )
}

export default SelectComponent
