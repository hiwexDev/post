// Dependencies
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    View, Image, TouchableOpacity,
    FlatList, Text,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

// API
import postsAPI from '../../api/post';


// Components
import Button from '../../components/button';
import Modal from '../../components/modal';
import Input from '../../components/input';

import { UploadFile } from '../../utils/uploadFile';

// Styles
import { styles } from './styles';

import add from '../../assets/icons/add.png';


// Title
// Image
// Content



const Posts = ({ navigation }) => {
    const [view, setView] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postsAPI.get()
            .then(({ data = [] }) => {
                setPosts(data);
            })
    }, [])
   
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "My Posts",
            headerStyle: {
                backgroundColor: '#6685A4',
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerShown: true,
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => setView(true)}
                >
                    <Image source={add} style={styles.addBtn}/>
                </TouchableOpacity>
            )
        })
    }, [navigation])


    const cleanStates = () => {
        setContent('');
        setTitle('');
        setImage('');
        setView(false);
    }

    const renderItem = ({item, index}) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />

            <Text style={styles.itemTitle}>{item.title}</Text>
            
            <Text style={styles.itemContent}>{item.content}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={renderItem}
            />

            <Modal
                visible={view}
                onClose={cleanStates}
            >
                <Input
                    title="Title"
                    custom={{
                        value:{title},
                        onChangeText: em => setTitle(em),
                    }}
                />
                <Input
                    title="Content"
                    custom={{
                        value:{content},
                        onChangeText: em => setContent(em),
                        multiline: true,
                        style: {
                            borderWidth: 1,
                            borderColor: '#FFF',
                            height: 150,
                            width: '100%',
                            paddingHorizontal: 10,
                            color: '#FFF',
                        }
                    }}
                />
                <Button
                    action={() => {
                        const options = {
							title: 'Selecciona foto del post',
							cancelButton: 'Cancelar',
							takePhotoButtonTitle: 'Tomar Foto',
							chooseFromLibraryButtonTitle: 'Abrir Galeria',
							noData: true,
						};
	
						ImagePicker.showImagePicker(options, (res) => {
							if (!res.didCancel) {
								UploadFile(res)
									.then((file) => setImage(file.secure_url))
                                    .catch(err => console.log({ err }));
							}
						});
                    }}
                    title="Load Image"
                />

                {image ? (<Text style={{ color: 'red', marginTop: 5 }}>Image Loaded</Text>) : null}
                <Button
                    action={() => {
                        postsAPI.post({ image, content, title })
                            .then(({ data }) => {
                                setPosts((_posts) => ([..._posts, data]));
                                cleanStates();
                            });
                    }}
                    title="Save"
                />
            </Modal>
        </View>
    );
}

export default Posts;
