import React, { useLayoutEffect, useState } from 'react';
import { View, TochableOpacity, Image } from 'react-native';
import {
    DrawerContentScrollView, DrawerItemList, DrawerItem
  } from '@react-navigation/drawer';
  import auth from '@react-native-firebase/auth';



// Assets
import logout from '../../assets/icons/logout.png';
import user from '../../assets/icons/usuario.png';


export default function CustomDrawerContent(props) {
    const [avatar, setAvatar] = useState('');

    useLayoutEffect(() => {
        auth()
			.onAuthStateChanged((usr) => {
				if (usr && usr.photoURL) {
					setAvatar(usr.photoURL);
				}
			})
    }, [props])

    return (
        <View style={{ flex: 1, backgroundColor: '#283541' }}>
            <View style={{ height: 250, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={avatar ? { uri: avatar } : user} style={{ width: 150, height: 150 }}/>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList
                    {...props}
                    activeBackgroundColor="#6685A4"
                    labelStyle={{ color: '#FFF' }}
                />
            </DrawerContentScrollView>

            <DrawerItem
                label="Sign Out"
                labelStyle={{ color: '#FFF' }}
                style={{ marginBottom: 25 }}
                icon={() => (
                    <Image source={logout} style={{ width: 20, height: 20, tintColor: '#FFF' }}/>
                )}
                onPress={() => {
                    auth()
                        .signOut()
                        .then(() => {
                            props.navigation.navigate('Login');
                        });
                }}
            />
        </View>
    );
}