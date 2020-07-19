import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Screen
import Routes from './stackRoutes';

const Stack = createStackNavigator();

const Header = () => (
	<View style={{ width: '100%', height: 45, backgroundColor:'red' }} />
);

const Button = () => (
	<TouchableOpacity
		style={{ width: 20, height: 20, backgroundColor: '#000' }}
		onPress={() => console.log('hello')}
	/>
);

function AppStack() {
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
				<Stack.Screen name="CreateUser" component={Routes.CreateUser} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default AppStack;
