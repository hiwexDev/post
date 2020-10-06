// Dependencies
import React, { useEffect, useState } from 'react';
import {
	View, Image
} from 'react-native';

// Components
import Button from '../../components/button';
import Modal from '../../components/modal';

// Styles
import { styles } from './styles';
import close from '../../assets/icons/close.png'
import { TouchableOpacity } from 'react-native';


const Posts = () => {
    const [view, setView] = useState(false);
    return (
        <View style={styles.container}>
            <Button
                title="Show"
                action={() => {
                    setView(true);
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
