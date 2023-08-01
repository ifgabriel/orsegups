import { Button, Device, Modal, Skeleton } from "@/components"
import { useCreateDevice, useDeleteDevice, useEditDevice, useFetchDevices } from "@/services"
import { handleStateRender, joinClassNames } from "@/utils"

import Form from "./Form"
import styles from './styles.module.css'

const Main = () => {
    const { data, isFetched } = useFetchDevices()
    const { mutate: editDevice } = useEditDevice()
    const { mutate: createDevice } = useCreateDevice()
    const { mutate: deleteDevice } = useDeleteDevice()

    return (
        <main className={styles.Container}>
            <h1>Dispositivos</h1>
            <Modal.Root>
                <Modal.Trigger>
                    <Button>Cadastrar Produto</Button>
                </Modal.Trigger>
                <Modal.Content>
                    <h2>Cadastrar Produto</h2>
                    <Form action={createDevice} />
                </Modal.Content>
            </Modal.Root>
            {{
                view: !!data && (
                    <ul className={joinClassNames(styles.List)}>
                        {data.map((device) => (
                            <Device.Root key={device.id}>
                                <Device.Content {...device}>
                                    <Device.Icon type={device.type} />
                                </Device.Content>
                                <Device.Actions>
                                    <Button onClick={() => deleteDevice(device.id)} appearance='negative'>Remover</Button>
                                    <Button onClick={() => editDevice(device)}>Alterar</Button>
                                </Device.Actions>
                            </Device.Root>
                        ))}
                    </ul>
                ),
                loading: (
                    <ul className={joinClassNames(styles.List)}>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <Skeleton key={`device-skeleton-${index}`} width="100%" height="137px" />
                        ))}
                    </ul>
                ),
                error: 'ERROR',
                empty: 'empty',
            }[handleStateRender(isFetched, data)]}
        </main>
    )
}


export default Main