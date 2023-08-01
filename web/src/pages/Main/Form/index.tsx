import { Button, Input, Modal, Select } from "@/components"
import { ModelDevice } from "@/domain"
import { useForm } from "react-hook-form"
import styles from './styles.module.css'

interface FormProps {
    defaultValues?: ModelDevice
    action: (data: ModelDevice) => void,
}

const TypeOptions = [{
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
}]

const Form = ({ defaultValues, action }: FormProps) => {
    const { register, handleSubmit, reset } = useForm<ModelDevice>({
        defaultValues: defaultValues
    })

    return (
        <form className={styles.Form}>
            <Input {...register('name')} label="Nome" />
            <Input {...register('serial')} label="Serial" />
            <Input {...register('macAddress')} label="MacAdress" />
            <Select {...register('type')} label="Tipo">
                {TypeOptions.map((option) => (
                    <option value={option.value} key={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>
            <footer className={styles.Footer}>
                <Button
                    type='submit'
                    onClick={
                        handleSubmit((data) => {
                            action(data)
                            reset()
                        })
                    }
                >Salvar</Button>
                <Modal.Trigger>
                    <Button onClick={() => reset()}>Cancelar</Button>
                </Modal.Trigger>
            </footer>
        </form>
    )
}

export default Form