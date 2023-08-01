export const TYPES = {
  CAMERA: 'CAMERA',
  SENSOR: 'SENSOR',
  REMOTE_CONTROL: 'REMOTE_CONTROL',
} as const

export type Types = keyof typeof TYPES

export interface RemoteDevice {
  id: string,
  name: string,
  serial: string,
  macAddress: string,
  type: Types,
}
