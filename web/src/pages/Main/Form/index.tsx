import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Button, Input, Modal, Select } from '@/components'
import { ModelDevice } from '@/domain'
import { yupResolver } from '@hookform/resolvers/yup'

import styles from './styles.module.css'

type FormType = Omit<ModelDevice, 'id'>

interface FormProps {
  defaultValues?: ModelDevice
  onCancel: () => void
  onSubmit: (data: FormType) => void
}

type TypeOptions = {
  label: string
  value: ModelDevice['type']
}

const TypeOptions: TypeOptions[] = [
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
    setValue,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues,
    resolver: yupResolver(schema),
  })

  return (
    <form className={styles.Form}>
      <Input
        {...register('name')}
        label="Nome"
        feedback={errors.name?.message}
      />
      <Input
        {...register('serial')}
        label="Serial"
        feedback={errors.serial?.message}
      />
      <Input
        {...register('macAddress')}
        label="MacAddress"
        placeholder="xx:xx:xx:xx:xx:xx"
        feedback={errors.macAddress?.message}
        onChange={(event) =>
          setValue('macAddress', applyMacAddressMask(event.target.value))
        }
      />
      <Select {...register('type')} label="Tipo">
        {TypeOptions.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <div className={styles.Actions}>
        <Button
          type="submit"
          onClick={handleSubmit((data) => {
            onSubmit(data)
            reset()
          })}
        >
          Salvar
        </Button>
        <Modal.Trigger>
          <Button
            type="reset"
            onClick={() => {
              onCancel()
              reset()
            }}
          >
            Cancelar
          </Button>
        </Modal.Trigger>
      </div>
    </form>
  )
}

export default Form
