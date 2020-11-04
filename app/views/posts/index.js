// Dependencies
import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';

// Components
import Button from '../../components/button';
import Modal from '../../components/modal';
import Input from '../../components/input';

// Styles
import { styles } from './styles';


const Posts = () => {
    const [view, setView] = useState(false);
    return (
        <View style={styles.container}>
            <Button
                title="Show"
                action={() => {
					const options = {
						title: 'Titulo del Picker',
						customButtons: [
							{name: 'fb', title: 'Facebook'},
							{name: 'otro', title: 'Otro'}
						],
						cancelButton: 'Cancelar',
						takePhotoButtonTitle: 'Tomar Foto',
						chooseFromLibraryButtonTitle: 'Abrir Galeria',
						noData: true,
					};

					ImagePicker.showImagePicker(options, (res) => {
						console.log({ res });
					});
				}}
            />

            <Modal
                visible={view}
                onClose={() => setView(false)}
            >
                <View style={{ width: 30, height: 30, backgroundColor: 'red' }}></View>
            </Modal>
        </View>
    );
}

export default Posts;
