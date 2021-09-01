// Dependencies
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';

// Styles
import { styles } from './styles';



const ViewPosts = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "View Posts",
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

        </View>
    );
}

export default ViewPosts;
