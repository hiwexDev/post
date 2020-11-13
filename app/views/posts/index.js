// Dependencies
import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Crypto from 'crypto-js';

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
                        quality: 0
					};

					ImagePicker.showImagePicker(options, (res) => {
                        
                        const uri = res.uri;
                        const type = res.type;
                        const name = res.fileName || 'image.jpg';

                        const photo = { uri, type, name };
                        const ts = Math.round((new Date()).getTime() / 1000);
                        const apiKey = '732334713499588';
                        const apiSecret = 'yA6Oo9zv2x_K__i7lO0C-Fiy0l4';
                        const hash = `timestamp=${ts}${apiSecret}`;
                        const signature = Crypto.SHA1(hash).toString();
                        const url = 'https://api.cloudinary.com/v1_1/test-hiwex/image/upload';

                        const formData = new FormData();
                        formData.append('file', photo);
                        formData.append('timestamp', ts);
                        formData.append('api_key', apiKey);
                        formData.append('signature', signature);

                        fetch(url, {
                            method: 'POST',
                            body: formData,
                        })
                        .then(res => res.json())
                        .then(res => console.log({ res }))
                        .catch(err => console.log({ err }))

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
