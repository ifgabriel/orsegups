import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  button: {
    height: 40,
    paddingHorizontal: 16,

    border: 'none',
    cursor: 'pointer',
    borderRadius: 4,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#000',
  },

  text: {
    fontSize: 16,
    color: '#FFF',
  }
})

export { styles }

