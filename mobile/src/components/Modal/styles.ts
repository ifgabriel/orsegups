import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    backDrop: {
        top: 0,
        height: '100%',
        width: '100%',
        backgroundColor: '#0000007A',
        position: 'absolute',
        bottom: 0,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        paddingVertical: 42,
        paddingHorizontal: 32,
        borderRadius: 16,
        width: '90%',
        minHeight: '50%',
        backgroundColor: '#FFF',
    }
})

export { styles }


