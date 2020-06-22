// Dependencies
import React, { Component } from 'react';
import {
	View, StyleSheet, Text,
	TouchableOpacity, TextInput,
} from 'react-native';


class CreateUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Email: null,
			Password: null,
			Phone: null,
		};
	}

	componentDidMount() {
		/**
		 * email,
         * phoneNumber,
         * password,
         * displayName,
		 */
	}

	render() {
		const { Email, Password, Phone } = this.state;

		// secureTextEntry

		return (
			<View style={styles.container}>
				<Text style={styles.title}>Email:</Text>
				<TextInput
					style={styles.text}
					value={Email}
					onChangeText={val => this.setState({ Email: val })}
				/>

				<Text style={styles.title}>Password:</Text>
				<TextInput
					secureTextEntry
					style={styles.text}
					value={Password}
					onChangeText={val => this.setState({ Password: val })}
				/>

				<Text style={styles.title}>Phone:</Text>
				<TextInput
					style={styles.text}
					value={Phone}
					onChangeText={val => this.setState({ Phone: val })}
				/>

				<TouchableOpacity
					style={styles.btn}
					onPress={() => {
						const user = {
							email: Email,
							password: Password,
							phoneNumber: Phone,
							displayName: 'Hello',
						};

						console.log({ Email, Password, Phone });
					}}
				>
					<Text style={styles.title}>Save</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#34495e',
		paddingVertical: 20,
		paddingHorizontal: 30,
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
		marginTop: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default CreateUser;
