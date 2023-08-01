import { ModelDevice } from "@/domain"
import { joinClassNames } from "@/utils"
import { ApertureIcon, CameraIcon, JoystickIcon } from "lucide-react"
import { ComponentProps, ReactElement, memo } from "react"
import styles from './styles.module.css'

interface DeviceIconProps extends ComponentProps<'div'> {
    type: ModelDevice['type']
}

type DeviceContentProps = ComponentProps<'div'> & ModelDevice

const handleIcon = (type: ModelDevice['type']) => {
    const icons: Record<ModelDevice['type'], ReactElement> = {
        CAMERA: <CameraIcon size={28} />,
        SENSOR: <ApertureIcon size={28} />,
        REMOTE_CONTROL: <JoystickIcon size={28} />
    }

    return icons[type]
}

const DeviceRoot = ({ className, ...props }: ComponentProps<'li'>) => {
    return (
        <li className={joinClassNames(styles.Root, className)} {...props} />
    )
}

const DeviceIcon = ({ type, className, ...props }: DeviceIconProps) => (
    <div className={joinClassNames(styles.Icon, className)}  {...props}>
        {handleIcon(type)}
    </div>
)

const DeviceContent = ({ name, serial, macAddress, className, children, ...props }: DeviceContentProps) => (
    <div className={joinClassNames(styles.Content, className)} {...props}>
        {children}
        <div>
            <h3>{name}</h3>
            <h4>{serial}</h4>
            <span className={styles.MacAddress}>{macAddress}</span>
        </div>
    </div>
)

const DeviceActions = ({ className, ...props }: ComponentProps<'div'>) => (
    <div className={joinClassNames(styles.Actions, className)} {...props} />
)

const Device = {
    Root: memo(DeviceRoot),
    Icon: memo(DeviceIcon),
    Content: memo(DeviceContent),
    Actions: memo(DeviceActions),
}

export default Device