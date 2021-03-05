// Dependencies
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    View, Image, TouchableOpacity,
    FlatList, Text,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';

// API
import postsAPI from '../../api/post';
import myPostsAPI from '../../api/myPosts';


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
    const [errors, setErrors] = useState({
        title: '',
        content: '',
    });
    const [uid, setUid] = useState(0);

    useEffect(() => {
        auth()
            .onAuthStateChanged((user) => {
                if (user) {
                    const { uid } = user;
                    myPostsAPI.post({ uid })
                        .then(({ data = [] }) => {
                            setPosts(data);
                            setUid(uid);
                        })
                }
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
        setErrors({
            title: '',
            content: '',
        });
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
                        onChangeText: (em) => {
                            setTitle(em);
                            setErrors(_errors => ({ ..._errors, title: '' }));
                        },
                    }}
                />

                {errors.title ? <Text style={styles.errorLabel}>{errors.title}</Text> : null}

                <Input
                    title="Content"
                    custom={{
                        value:{content},
                        onChangeText: (em) => {
                            setContent(em);
                            setErrors(_errors => ({ ..._errors, content: '' }));
                        },
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

                {errors.content ? <Text style={styles.errorLabel}>{errors.content}</Text> : null}

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
									.then((file) => {
                                        setImage(file.secure_url);
                                    })
                                    .catch(err => console.log({ err }));
							}
						});
                    }}
                    title="Load Image"
                />

                {image ? (<Text style={styles.imageLoaded}>Image Loaded</Text>) : null}
                <Button
                    action={() => {
                        let err = {};

                        if(!title) err = {...err, title: 'Please fill in the title field'};
                        if(!content) err = {...err, content: 'Please fill in the content field'};

                        if (err.title) {
                            setErrors(_errors => ({ ..._errors, ...err }));
                        } else {
                            postsAPI.post({ image, content, title, uid })
                                .then(({ data }) => {
                                    setPosts((_posts) => ([..._posts, data]));
                                    cleanStates();
                                });
                        }

                    }}
                    title="Save"
                />
            </Modal>
        </View>
    );
}

export default Posts;
