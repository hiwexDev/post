// Dependencies
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(1,1,1, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subcontainer: {
        height: '80%',
        width: '90%',
        backgroundColor: '#FFF',
    },
    headerContainer: {
        height: 45,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    btnClose: {
        width: 30,
        height: 30,
        tintColor: '#000',
    }
});