// Dependencies
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { useIsDrawerOpen } from '@react-navigation/drawer'

// Components
import Button from '../../components/button';
import Modal from '../../components/modal';

import { UploadFile } from '../../utils/uploadFile';

// Styles
import { styles } from './styles';

import drawer from '../../assets/icons/drawer.png';



const Posts = ({ navigation }) => {
    const [view, setView] = useState(false);
    const isOpen = useIsDrawerOpen();
   
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

    return (
        <View style={styles.container}>
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
