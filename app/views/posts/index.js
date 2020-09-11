// Dependencies
import React, { useEffect, useState } from 'react';
import {
	View, TextInput, TouchableOpacity,
	Text, Image,
} from 'react-native';

// Components
import Button from '../../components/button';

// Styles
import { styles } from './styles';


const Posts = () => {
    const [state, setState] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('update');

        return () => console.log('prev');
    });
    
    useEffect(() => {
        console.log('mount');
    }, []);

    useEffect(() => {
        console.log('update state');
    }, [state, count])

    return (
        <View style={styles.container}>
            <Button
                title="use"
                action={() => {
                    setState(1 + state)
                }}
            />

            <Button
                title="count"
                action={() => {
                    setCount(1 + count)
                }}
            />
        </View>
    );
}

export default Posts;
