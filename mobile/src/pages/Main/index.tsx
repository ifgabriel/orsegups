import React, { useCallback, useRef, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import {
    Button,
    Device,
    ExceptionState,
    Modal,
    ModalRef,
    Skeleton,
} from './../../components'
import { ModelDevice } from './../../domain'
import {
    useCreateDevice,
    useDeleteDevice,
    useEditDevice,
    useFetchDevices,
} from './../../services'
import Form from './Form'

import { handleStateRender } from '../../utils'
import { styles } from './styles'

const Main = () => {
  const modalRef = useRef<ModalRef>(null)

  const [deviceSelected, setDeviceSelected] = useState<ModelDevice>()

  const { data, isFetched } = useFetchDevices()
  const { mutate: editDevice } = useEditDevice()
  const { mutate: createDevice } = useCreateDevice()
  const { mutate: deleteDevice } = useDeleteDevice()

  const handleOnSubmit = useCallback(
    (data: ModelDevice) => {
      if (deviceSelected) {
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
    },
    [deviceSelected],
  )

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dispositivos</Text>
      <Modal.Root ref={modalRef}>
        <Modal.Trigger>
          <Button>Cadastrar Dispositivo</Button>
        </Modal.Trigger>
        <Modal.Content>
          <Text style={styles.title}>Cadastrar Dispositivo</Text>
          <Form
            onSubmit={handleOnSubmit}
            onCancel={() => setDeviceSelected(undefined)}
            defaultValues={deviceSelected}
          />
        </Modal.Content>
      </Modal.Root>
      <View style={styles.container}>
        {
          {
            view:
              !!data &&
              data.map((device: ModelDevice) => (
                <Device.Root key={device.id}>
                  <Device.Content {...device}>
                    <Device.Icon type={device.type} />
                  </Device.Content>
                  <Device.Actions>
                    <Button onPress={() => deleteDevice(device.id)}>
                      Remover
                    </Button>
                    <Button
                      onPress={() => {
                        modalRef.current?.toggle()
                        setDeviceSelected(device)
                      }}
                    >
                      Alterar
                    </Button>
                  </Device.Actions>
                </Device.Root>
              )),
            loading: Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={`device-skeleton-${index}`}
                width="100%"
                height={137}
              />
            )),
            error: (
              <ExceptionState
                title="Oopss!"
                type="error"
                description="Tivemos um problema, tente novamente mais tarde!"
              />
            ),
            empty: (
              <ExceptionState
                title="Oopss!"
                type="empty"
                description="Nenhum dispositivo cadastrado!"
              />
            ),
          }[handleStateRender(isFetched, data, data?.length === 0)]
        }
      </View>
    </ScrollView>
  )
}

export default Main
