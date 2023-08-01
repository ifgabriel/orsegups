import { Button, Device, Modal, ModalRef, Skeleton } from '@/components'
import {
  useCreateDevice,
  useDeleteDevice,
  useEditDevice,
  useFetchDevices,
} from '@/services'
import { handleStateRender, joinClassNames } from '@/utils'

import Form from './Form'
import styles from './styles.module.css'
import { useCallback, useRef, useState } from 'react'
import { ModelDevice } from '@/domain'

const Main = () => {
  const modalRef = useRef<ModalRef>(null)

  const [deviceSelected, setDeviceSelected] = useState<ModelDevice>()

  const { data, isFetched } = useFetchDevices()
  const { mutate: editDevice } = useEditDevice()
  const { mutate: createDevice } = useCreateDevice()
  const { mutate: deleteDevice } = useDeleteDevice()

  const handleOnSubmit = useCallback((data: ModelDevice) => {
    if (!!deviceSelected) {
      return editDevice(data, {
        onSuccess: () => {
          setDeviceSelected(undefined)
          modalRef.current?.toggle()
        },
      })
    }

    createDevice(data, {
      onSuccess: () => modalRef.current?.toggle(),
    })
  }, [deviceSelected])

  return (
    <main className={styles.Container}>
      <h1>Dispositivos</h1>
      <Modal.Root ref={modalRef}>
        <Modal.Trigger>
          <Button>Cadastrar Produto</Button>
        </Modal.Trigger>
        <Modal.Content>
          <h2>Cadastrar Produto</h2>
          <Form
            onSubmit={handleOnSubmit}
            onCancel={() => setDeviceSelected(undefined)}
            defaultValues={deviceSelected}
          />
        </Modal.Content>
      </Modal.Root>
      {
        {
          view: !!data && (
            <ul className={joinClassNames(styles.List)}>
              {data.map((device) => (
                <Device.Root key={device.id}>
                  <Device.Content {...device}>
                    <Device.Icon type={device.type} />
                  </Device.Content>
                  <Device.Actions>
                    <Button
                      onClick={() => deleteDevice(device.id)}
                      appearance="negative"
                    >
                      Remover
                    </Button>
                    <Button
                      onClick={() => {
                        setDeviceSelected(device)
                        modalRef.current?.toggle()
                      }}
                    >
                      Alterar
                    </Button>
                  </Device.Actions>
                </Device.Root>
              ))}
            </ul>
          ),
          loading: (
            <ul className={joinClassNames(styles.List)}>
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton
                  key={`device-skeleton-${index}`}
                  width="100%"
                  height="137px"
                />
              ))}
            </ul>
          ),
          error: 'ERROR',
          empty: 'empty',
        }[handleStateRender(isFetched, data)]
      }
    </main>
  )
}

export default Main
