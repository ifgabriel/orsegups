export const TYPES = {
  CAMERA: 'CAMERA',
  SENSOR: 'SENSOR',
  REMOTE_CONTROL: 'REMOTE_CONTROL',
} as const

export type Types = keyof typeof TYPES

export interface ModelDevice {
  id: string,
  name: string,
  serial: string,
  macAddress: string,
  type: Types,
}
