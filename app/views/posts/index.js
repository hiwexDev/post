// Dependencies
import React, { useEffect, useState } from 'react';
import {
	View, FlatList, Text
} from 'react-native';

// Components
import Button from '../../components/button';

// Styles
import { styles } from './styles';


const Posts = () => {
    const [arr, setArr] = useState([]);
    const [data, setData] = useState([]);
    const [counter, setCounter] = useState(0);
    const [refreshing, setRefresh] = useState(false);

    const getData = () => {
        const end = counter + 30;
        const slice = data.slice(counter, end);
        setArr([...arr, ...slice]);
        setCounter(end);
    }

    useEffect(() => {
        const _arr = [];
        for (let index = 0; index < 100; index++) {
            _arr.push({ name: `name ${index}` });
        }

        setData(_arr);
        const end = counter + 30;
        const slice = _arr.slice(counter, end);
        setArr(slice);
        setCounter(end);
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={arr}
                renderItem={({ item, index }) => (
                    <Button title={item.name} action={() => console.log(item.name)}/>
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 10, width: '100%', backgroundColor: 'black' }}/>
                )}
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, marginTop: 30 }}>
                        <Text>Empty</Text>
                    </View>
                )}
                onEndReached={getData}
                refreshing={refreshing}
                onRefresh={() => {
                    setArr([]);
                    setCounter(0);
                    console.log('Hola');
                }}
            />
        </View>
    );
}

export default Posts;
