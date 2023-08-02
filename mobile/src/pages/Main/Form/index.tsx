import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import * as yup from 'yup'
import { Button, Input, Modal, Select } from '../../../components'
import { ModelDevice } from '../../../domain'
import { styles } from './styles'

type FormType = Omit<ModelDevice, 'id'>

type TypeOptions = {
  label: string
  value: ModelDevice['type']
}

interface FormProps {
  defaultValues?: ModelDevice
  onCancel: () => void
  onSubmit: (data: ModelDevice) => void
}

const OptionsType: TypeOptions[] = [
  {
    label: 'Câmera',
    value: 'CAMERA',
  },
  {
    label: 'Sensor',
    value: 'SENSOR',
  },
  {
    label: 'Controle Remote',
    value: 'REMOTE_CONTROL',
  },
]

const schema = yup
  .object({
    name: yup.string().required('O campo é obrigatório!'),
    serial: yup.string().required('O campo é obrigatório!'),
    macAddress: yup
      .string()
      .required('O campo é obrigatório!')
      .matches(
        /^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$/,
        'O MAC Address deve estar no formato xx:xx:xx:xx:xx:xx',
      ),
    type: yup.string<ModelDevice['type']>().required('O campo é obrigatório!'),
  })
  .required()

const applyMacAddressMask = (value: string) => {
  const cleanedValue = value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 12)

  let maskedValue = ''

  for (let i = 0; i < cleanedValue.length; i++) {
    if (i > 0 && i % 2 === 0) {
      maskedValue += ':'
    }

    maskedValue += cleanedValue[i]
  }

  return maskedValue
}

const Form = ({ defaultValues, onSubmit, onCancel }: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues,
    resolver: yupResolver(schema),
  })

  return (
    <View style={styles.form}>
      <Input
        {...register('name')}
        value={watch('name')}
        label="Nome"
        feedback={errors.name?.message}
        onChangeText={(text) => setValue('name', text)}
      />
      <Input
        {...register('serial')}
        value={watch('serial')}
        onChangeText={(text) => setValue('serial', text)}
        label="Serial"
        feedback={errors.serial?.message}
      />
      <Input
        {...register('macAddress')}
        label="MacAdress"
        placeholder="xx:xx:xx:xx:xx:xx"
        feedback={errors.macAddress?.message}
        value={watch('macAddress')}
        maxLength={17}
        onChangeText={(text) =>
          setValue('macAddress', applyMacAddressMask(text))
        }
      />
      <Select
        label="Tipo"
        options={OptionsType}
        defaultValue={watch('type')}
        onChangeValue={(value) => setValue('type', value)}
      />
      <View style={styles.actions}>
        <Button
          onPress={handleSubmit((data) => {
            onSubmit(data)
            reset()
          })}
        >
          Salvar
        </Button>
        <Modal.Trigger>
          <Button
            onPress={() => {
              onCancel()
              reset()
            }}
          >
            Cancelar
          </Button>
        </Modal.Trigger>
      </View>
    </View>
  )
}

export default Form
