// Dependencies
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Image, TouchableOpacity, FlatList, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { useIsDrawerOpen } from '@react-navigation/drawer'

// Components
import Button from '../../components/button';
import Modal from '../../components/modal';

import { UploadFile } from '../../utils/uploadFile';

// Styles
import { styles } from './styles';

// API
import postAPI from '../../api/post';

import drawer from '../../assets/icons/drawer.png';



const Posts = ({ navigation }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postAPI.get()
            .then(({ data = [] }) => {
                setPosts(data);
            })
    }, [])
   
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Posts",
            headerStyle: {
                backgroundColor: '#6685A4',
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerShown: true,
        })
    }, [navigation])

    const renderItem = ({item, index}) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
                navigation.navigate('ViewPosts');
            }}
        >
            <Image source={{ uri: item.image }} style={styles.itemImage} />

            <View style={styles.textContainerRow}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                
                <Text style={styles.itemContent}>{item.content}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.uuid}
            />
        </View>
    );
}

export default Posts;
