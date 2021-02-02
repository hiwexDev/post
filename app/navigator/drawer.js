import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Routes
import Routes from './drawerRoutes';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      headerMode="screen"
    >
        <Drawer.Screen name="Post" component={Routes.Posts} />
    </Drawer.Navigator>
  );
}