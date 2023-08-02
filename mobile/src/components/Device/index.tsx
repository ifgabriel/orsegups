import { Aperture, Camera, Joystick } from 'lucide-react-native'
import { ReactElement } from 'react'
import { Text, View, ViewProps } from 'react-native'
import { ModelDevice } from './../../domain'
import { styles } from './styles'

interface DeviceIconProps extends ViewProps {
  type: ModelDevice['type']
}

type DeviceContentProps = ViewProps & ModelDevice

const handleIcon = (type: ModelDevice['type']) => {
  const icons: Record<ModelDevice['type'], ReactElement> = {
    CAMERA: <Camera size={28} color="#FABB18" />,
    SENSOR: <Aperture size={28} color="#FABB18" />,
    REMOTE_CONTROL: <Joystick size={28} color="#FABB18" />,
  }

  return icons[type]
}

const DeviceRoot = (props: ViewProps) => <View style={styles.root} {...props} />
const DeviceActions = (props: ViewProps) => (
  <View style={styles.actions} {...props} />
)

const DeviceIcon = ({ type, ...props }: DeviceIconProps) => (
  <View style={styles.icon} {...props} testID={`${type}-icon`}>
    {handleIcon(type)}
  </View>
)

const DeviceContent = ({
  name,
  serial,
  macAddress,
  children,
  ...props
}: DeviceContentProps) => (
  <View style={styles.content} {...props}>
    {children}
    <View style={styles.details}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.serial}>{serial}</Text>
      <Text style={styles.macAddress}>{macAddress}</Text>
    </View>
  </View>
)

const Device = {
  Root: DeviceRoot,
  Icon: DeviceIcon,
  Content: DeviceContent,
  Actions: DeviceActions,
}

export default Device
