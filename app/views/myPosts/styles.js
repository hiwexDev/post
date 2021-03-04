import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#34495e',
	},
	addBtn: {
		width: 20,
		height: 20,
		tintColor: '#FFF',
		marginRight: 10,
	},
	itemContainer: {
		width: '100%',
		height: 200,
		borderBottomColor: '#FFF',
		borderBottomWidth: 1,
	},
	itemImage: {
		width: '100%',
		height: 100,
	},
	itemTitle: {
		color: '#FFF',
		fontSize: 25,
		fontWeight: 'bold',
		marginLeft: 10,
	},
	itemContent: {
		color: '#FFF',
		fontSize: 10,
		marginLeft: 10,
		marginTop: 5,
	},
	imageLoaded: {
		color: '#FFF',
		fontWeight: 'bold',
		marginTop: 5,
	},
	errorLabel: {
		color: 'red',
		fontWeight: 'bold',
		marginTop: 5,
	},
});