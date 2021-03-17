import React from 'react';
import { TextInput, Text } from 'react-native';

import { styles } from './styles';

function Input({ title,  custom, value }) {
    return (
        <>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={styles.text}
                value={value}
                {...custom}
            />
        </>
    );
}

export default Input;
