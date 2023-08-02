import express from 'express'
import Joi from 'joi'
import { v4 as uuidv4 } from 'uuid'
import { Device } from '../models/devices'

const router = express.Router()
const devices: Device[] = require('../data/devices.json')

const deviceSchema = Joi.object({
  name: Joi.string().required(),
  serial: Joi.string().required(),
  macAddress: Joi.string().required(),
  type: Joi.string().valid('CAMERA', 'SENSOR', 'REMOTE_CONTROL').required(),
})

router.get('/', (request, response) => {
  response.status(200).json(devices)
})

router.post('/', (request, response) => {
  const { error } = deviceSchema.validate(request.body)

  if (error) {
    return response.status(400).json({ error: error.details[0].message })
  }

  const newDevice: Device = {
    id: uuidv4(),
    ...request.body,
  }

  devices.push(newDevice)
  response.status(201).json(newDevice)
})

router.patch('/:deviceId', (request, response) => {
  const deviceId = request.params.deviceId
  const deviceIndex = devices.findIndex((device) => device.id === deviceId)

  if (deviceIndex === -1) {
    return response.status(404).json({ error: 'Device not found' })
  }

  const { id, ...oldDevice } = devices[deviceIndex]
  const { error } = deviceSchema.validate({ ...oldDevice, ...request.body })

  if (error) {
    return response.status(400).json({ error: error.details[0].message })
  }

  devices[deviceIndex] = {
    ...devices[deviceIndex],
    ...request.body,
  }

  response.json(devices[deviceIndex])
})

router.delete('/:deviceId', (request, response) => {
  const deviceId = request.params.deviceId
  const deviceIndex = devices.findIndex((device) => device.id === deviceId)

  if (deviceIndex === -1) {
    return response.status(404).json({ error: 'Device not found' })
  }

  devices.splice(deviceIndex, 1)

  response.sendStatus(204).json({ message: 'Device deleted successfully' })
})

export default router
