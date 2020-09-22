// Dependencies
import React, { Component } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';


// Components
import Button from '../../components/button';
import Input from '../../components/input';
import createUser from '../../api/user';

// Styles
import { styles } from './styles';


class CreateUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Email: null,
			Password: null,
			Phone: null,
		};
	}

	render() {
		const { Email, Password, Phone } = this.state;

		// secureTextEntry

		return (
			<View style={styles.container}>
				<Input
					title="Email"
					custom={{
						value:{Email},
						onChangeText: val => this.setState({ Email: val }),
					}}
				/>

				<Input
					title="Password"
					custom={{
						value:{Password},
						onChangeText: val => this.setState({ Password: val }),
						secureTextEntry: true,
					}}
				/>

				<Input
					title="Phone"
					custom={{
						value:{Phone},
						onChangeText: val => this.setState({ Phone: val }),
					}}
				/>

				<Button
					title="Save"
					action={() => {
						const usr = {
							email: Email,
							phoneNumber: Phone,
							password: Password,
							displayName: 'Person X',
						};

						createUser.post(usr)
							.then((rows) => {
								auth().signInWithEmailAndPassword(Email, Password)
									.then((user) => {
										console.log({ user, usr });
										this.props.navigation.navigate('Post')
									})
									.catch(err => console.log({ err }));
							});
					}}
				/>
			</View>
		);
	}
}

export default CreateUser;

