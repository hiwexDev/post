// Dependencies
import React, { Component } from 'react';
import {
	View, TextInput, TouchableOpacity,
	Text, StyleSheet
} from 'react-native';

import auth from '@react-native-firebase/auth';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#34495e',
		paddingVertical: 20,
		paddingHorizontal: 30,
	},
	subcontainer: {
		flex: 1,
	},
	title: {
		color: '#FFF',
		fontSize: 16,
		fontWeight: 'bold',
		marginVertical: 10,
	},
	text: {
		borderWidth: 1,
		borderColor: '#FFF',
		height: 45,
		width: '100%',
		paddingHorizontal: 10,
		color: '#FFF',
	},
	btn: {
		borderWidth: 1,
		borderColor: '#FFF',
		height: 45,
		width: '100%',
		marginTop: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

class Login extends Component {
	componentDidMount() {
		auth()
			.createUserWithEmailAndPassword('sarah.lane@gmail.com', 'SuperSecretPassword!')
			.then(() => {
				console.log('User account created & signed in!');
			})
			.catch(error => {
				if (error.code === 'auth/email-already-in-use') {
				console.log('That email address is already in use!');
				}

				if (error.code === 'auth/invalid-email') {
				console.log('That email address is invalid!');
				}

				console.error(error);
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.subcontainer} />

				<View style={styles.subcontainer}>
					<Text style={styles.title}>Email</Text>
					<TextInput
						style={styles.text}
					/>
					<Text style={styles.title}>Password</Text>
					<TextInput
						style={styles.text}
					/>

					<TouchableOpacity
						style={styles.btn}
					>
						<Text style={styles.title}>Login</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Login;
