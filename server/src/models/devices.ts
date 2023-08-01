export interface Device {
    id: string;
    name: string;
    serial: string;
    macAddress: string;
    type: 'CAMERA' | 'SENSOR' | 'REMOTE_CONTROL'
}