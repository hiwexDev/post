// Dependencies
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    View, Image, TouchableOpacity,
    FlatList, Text, Alert,
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
import { customStyles, styles } from './styles';

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
        image: '',
    });
    const [uid, setUid] = useState(0);
    const [uuid, setUuid] = useState(0);

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
            image: '',
        });
        setUuid(0);
    }

    const renderItem = ({item, index}) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />

            <View style={styles.textContainerRow}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                
                <Text style={styles.itemContent}>{item.content}</Text>
            </View>

            <View style={styles.buttonContainerRow}>
                <TouchableOpacity
                    onPress={() => {
                        setTitle(item.title);
                        setContent(item.content);
                        setImage(item.image);
                        setUuid(item.uuid);
                        setView(true);
                    }}
                >
                    <Text style={styles.buttonTxtRow}>Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            'Alert',
                            'Do you want to delete this post?',
                            [
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        postsAPI.delete({ uuid: item.uuid })
                                            .then(() => {
                                                setPosts((_posts) => {
                                                    _posts.splice(index, 1);
                                                    return [..._posts];
                                                });
                                            })
                                    }
                                },
                                {
                                    text: 'No',
                                    style: 'cancel',
                                }
                            ]
                        );
                    }}
                >
                    <Text style={styles.buttonTxtRow}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.uuid}
            />

            <Modal
                visible={view}
                onClose={cleanStates}
            >
                <Input
                    title="Title"
                    value={title}
                    custom={{
                        onChangeText: (em) => {
                            console.log('entry')
                            setTitle(em);
                            setErrors(_errors => ({ ..._errors, title: '' }));
                        },
                    }}
                />

                {errors.title ? <Text style={styles.errorLabel}>{errors.title}</Text> : null}

                <Input
                    title="Content"
                    value={content}
                    custom={{
                        onChangeText: (em) => {
                            setContent(em);
                            setErrors(_errors => ({ ..._errors, content: '' }));
                        },
                        multiline: true,
                        style: customStyles
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
                                        setErrors(_errors => ({ ..._errors, image: '' }));
                                    })
                                    .catch(err => console.log({ err }));
							}
						});
                    }}
                    title="Load Image"
                />

                {errors.image ? <Text style={styles.errorLabel}>{errors.image}</Text> : null}

                {image ? (<Text style={styles.imageLoaded}>Image Loaded</Text>) : null}
                <Button
                    action={() => {
                        let err = {};

                        if(!title) err = {...err, title: 'Please fill in the title field'};
                        if(!content) err = {...err, content: 'Please fill in the content field'};
                        if(!image) err = {...err, image: 'Please select a image'};

                        if (err.title || err.image || err.content) {
                            setErrors(_errors => ({ ..._errors, ...err }));
                        } else {
                            if(uuid) {
                                postsAPI.put({ image, content, title, uid, uuid })
                                    .then(({ data }) => {
                                        setPosts((_posts) => {
                                            const index = _posts.findIndex(i => i.uuid === uuid);
                                            _posts[index] = data;
                                            return [..._posts];
                                        });
                                        cleanStates();
                                    })
                            } else {
                                postsAPI.post({ image, content, title, uid })
                                    .then(({ data }) => {
                                        setPosts((_posts) => ([..._posts, data]));
                                        cleanStates();
                                    });
                            }
                        }

                    }}
                    title="Save"
                />
            </Modal>
        </View>
    );
}

export default Posts;
