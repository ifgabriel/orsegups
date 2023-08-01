import { Skeleton } from "@/components"
import { ModelDevice } from "@/domain"
import { useDeleteDevice, useEditDevice, useFetchDevices } from "@/services"
import { handleStateRender } from "@/utils"

import { ApertureIcon, CameraIcon, JoystickIcon } from "lucide-react"
import { ReactElement } from "react"
import styles from './styles.module.scss'

const handleIcon = (type: ModelDevice['type']) => {
    const icons: Record<ModelDevice['type'], ReactElement> = {
        CAMERA: <CameraIcon />,
        SENSOR: <ApertureIcon />,
        REMOTE_CONTROL: <JoystickIcon />
    }

    return icons[type]
}

const Main = () => {
    const { data, isFetched } = useFetchDevices()
    const { mutate: editDevice } = useEditDevice()
    const { mutate: deleteDevice } = useDeleteDevice()

    return (
        <main className={styles.Container}>
            <h1>Dispositivos</h1>
            {{
                view: !!data && (
                    <section className={styles.Devices}>
                        <ul>
                            {data.map((device) => (
                                <li key={device.id}>
                                    {handleIcon(device.type)}
                                    <div>
                                        <span>{device.name}</span>
                                        <span>{device.serial}</span>
                                        <span>{device.macAddress}</span>
                                    </div>
                                    <div>
                                        <button type='button' onClick={() => editDevice(device)}>Edit</button>
                                        <button type='button' onClick={() => deleteDevice(device.id)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                ),
                loading: (
                    Array.from({ length: 10 }).map((_, index) => (
                        <Skeleton key={`device-skeleton-${index}`} />
                    ))
                ),
                error: 'ERROR',
                empty: 'empty',
            }[handleStateRender(isFetched, data)]}

        </main>
    )
}


export default Main