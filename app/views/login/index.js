// Dependencies
import React, { Component } from 'react';
import {
	View, TextInput, TouchableOpacity,
	Text, StyleSheet
} from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'blue',
	},
	box: {
		flex: 1,
		backgroundColor: 'red',
	},
});

class Login extends Component {
	render() {
		const { cont = 'container', click } = this.props;

		return (
			<View style={styles[cont]}>
				<Text>Email</Text>
				<TextInput/>
				<Text>Password</Text>
				<TextInput/>

				<TouchableOpacity onPress={click} />
			</View>
		);
	}
}

export default Login;
