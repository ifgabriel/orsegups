import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  root: {
    paddingVertical: 24,
    paddingHorizontal: 16,

    gap: 32,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',

    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: '#FFF',
  },

  content: {
    gap: 24,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  details: {
    flex: 1,
    gap: 4,
    display: 'flex',
    flexDirection: 'column',
  },

  name: {
    fontSize: 16,
    color: '#000',
  },

  serial: {
    color: '#9A9A9A',
  },

  actions: {
    gap: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  icon: {
    width: 60,
    height: 60,
    backgroundColor: '#FABB181A',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },

  macAddress: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFF8E8',
    fontSize: 14,
    color: '#000000',
    textTransform: 'uppercase',
  },
})

export { styles }

