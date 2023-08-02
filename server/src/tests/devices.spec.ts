import request from 'supertest'
import { Device } from '../models/devices'
import app from '../server'

const devicesData = require('../data/devices.json')

describe('Device routes tests', () => {
  it('GET /devices should return status 200 and a list of devices', async () => {
    const response = await request(app).get('/devices')

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual(devicesData)
  })

  it('POST /devices should create a new device and return status 201', async () => {
    const newDevice = {
      name: 'New Device',
      serial: 'NEW123',
      macAddress: '11:22:33:44:55:66',
      type: 'CAMERA',
    }
    const response = await request(app).post('/devices').send(newDevice)

    expect(response.statusCode).toBe(201)
    expect(response.body).toMatchObject(newDevice)
  })

  it('POST /devices should return status 400 when the device data is invalid', async () => {
    const invalidDevice = { name: 'Invalid Device' }
    const response = await request(app).post('/devices').send(invalidDevice)

    expect(response.statusCode).toBe(400)
  })

  it('POST /devices should return status 400 when the device type is invalid', async () => {
    const invalidDevice = {
      name: 'New Device',
      serial: 'NEW123',
      macAddress: '11:22:33:44:55:66',
      type: 'CENTER',
    }
    const response = await request(app).post('/devices').send(invalidDevice)

    expect(response.statusCode).toBe(400)
  })

  it('PATCH /devices/:id should update an existing device and return status 200', async () => {
    const deviceId = '1'
    const updatedDevice = { name: 'Updated Device' }
    const result = { ...devicesData.find((device: Device) => device.id === deviceId), ...updatedDevice }
    const response = await request(app).patch(`/devices/${deviceId}`).send(updatedDevice)

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual(result)
  })

  it('PATCH /devices/:id should return status 404 when the device does not exist', async () => {
    const updatedDevice = { name: 'Updated Device' }
    const response = await request(app).patch('/devices/100').send(updatedDevice)

    expect(response.statusCode).toBe(404)
    expect(response.body).toStrictEqual({ error: 'Device not found' })
  })

  it('DELETE /devices/:id should delete an existing device and return status 204', async () => {
    const response = await request(app).delete(`/devices/1`)

    expect(response.statusCode).toBe(204)
  })

  it('DELETE /devices/:id should return status 404 when the device does not exist', async () => {
    const response = await request(app).delete(`/devices/100`)

    expect(response.statusCode).toBe(404)
    expect(response.body).toStrictEqual({ error: 'Device not found' })
  })
})
