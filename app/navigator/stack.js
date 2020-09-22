import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Screen
import Routes from './stackRoutes';

// Assets
import back from '../assets/icons/back.png';

const Stack = createStackNavigator();

const getButton = ({ navigation }) => (
	<TouchableOpacity
		style={{ flexDirection: 'row' }}
		onPress={() => navigation.goBack()}
	>
		<Image source={back} style={{ width: 15, height: 15, tintColor: '#FFF', marginLeft: 5, marginRight: 5 }}/>
		<Text style={{ color: '#FFF' }}>Back</Text>
	</TouchableOpacity>
);

function AppStack() {
	// 6685A4
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Login"
					component={Routes.Login}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Post"
					component={Routes.Posts}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="CreateUser"
					component={Routes.CreateUser}
					options={(nav) => ({
						title: "Create User",
						headerStyle: {
							backgroundColor: '#6685A4',
						},
						headerTintColor: '#FFF',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
						headerLeft: () => getButton(nav),
					})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default AppStack;
