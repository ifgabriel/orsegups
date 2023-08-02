import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    input: {
        marginTop: 8,
        height: 40,
        width: '100%',
        padding: 8,
        borderRadius: 4,
        fontSize: 16,
        backgroundColor: '#F1F1F1',
        borderWidth: 1,
        borderColor: '#F1F1F1'
    },

    feedback: {
        fontSize: 12,
        height: 18,
        color: '#CB1B1B',
    },
    
    selectButtonText: {
        fontSize: 16,
        color: '#000'
    },

    backDrop: {
        height: '100%',
        width: '100%',
        backgroundColor: '#0000007A',
        position: 'absolute',
        bottom: 0,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    content: {
        paddingVertical: 42,
        paddingHorizontal: 32,
        borderRadius: 16,
        width: '100%',
        backgroundColor: '#FFF',

        gap: 8,
        display: 'flex',
        flexDirection: 'column',
    },

    option: {
        paddingHorizontal: 8,
        paddingVertical: 16,
        fontSize: 16,
        color: '#000',
        borderRadius: 8,
        backgroundColor: '#F1F1F1'
    },
})

export { styles }


