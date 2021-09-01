import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Components
import DrawerComponent from '../components/drawer';

// Routes
import Routes from './drawerRoutes';

const Drawer = createDrawerNavigator();

// Container #283541
// Current #6685A4

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      headerMode="screen"
      drawerContent={(props) => <DrawerComponent {...props}/> }
    >
        <Drawer.Screen name="Post" component={Routes.Posts} />
        <Drawer.Screen name="My Posts" component={Routes.MyPosts} />
    </Drawer.Navigator>
  );
}