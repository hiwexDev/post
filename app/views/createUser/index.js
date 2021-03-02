// Dependencies
import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-picker';


// Components
import Button from '../../components/button';
import Input from '../../components/input';
import createUser from '../../api/user';
import { UploadFile } from '../../utils/uploadFile';

// Styles
import { styles } from './styles';
import userImg from '../../assets/icons/usuario.png'


class CreateUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Email: null,
			Password: null,
			Phone: null,
			uri: null,
		};
	}

	render() {
		const { Email, Password, Phone, uri } = this.state;

		// secureTextEntry

		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={{
						height: 200,
						width: 200,
						borderRadius: 100,
						borderColor: '#FFF',
						borderWidth: 1,
						justifyContent: 'center',
						alignItems: 'center'
					}}

					onPress={() => {
						const options = {
							title: 'Selecciona foto de perfil',
							cancelButton: 'Cancelar',
							takePhotoButtonTitle: 'Tomar Foto',
							chooseFromLibraryButtonTitle: 'Abrir Galeria',
							noData: true,
						};
	
						ImagePicker.showImagePicker(options, (res) => {
							if (!res.didCancel) {
								UploadFile(res)
									.then((file) => {
										console.log({ file });
										this.setState({ uri: file.secure_url });
									});
							}
						});
					}}
				>
					<Image
						source={uri ? {uri} : userImg}
						style={{
							height: 120,
							width: 120,
						}}
					/>
				</TouchableOpacity>

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
							photoURL: uri,
						};

						createUser.post(usr)
							.then((rows) => {
								auth().signInWithEmailAndPassword(Email, Password)
									.then((user) => {
										console.log({ user, usr });
										this.props.navigation.navigate('Home')
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

