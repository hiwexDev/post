import React from 'react';
import { TextInput, Text } from 'react-native';

import { styles } from './styles';

function Input({ title,  custom }) {
    return (
        <>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={styles.text}
                {...custom}
            />
        </>
    );
}

export default Input;
