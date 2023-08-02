import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    exceptionState: {
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
})

export { styles }


