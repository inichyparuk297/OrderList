import React, { Component } from 'react'
import { NavigationContainer, ThemeProvider } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from './loginScreen'
import MasterListScreen from './masterList'

export const ScreenId = {
	Login: "OrderList.Login",
	MasterList: "OrderList.MasterList",
	Order: "OrderList.Order"
}

const Stack = createStackNavigator()

export class Navigator extends Component {
	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }} >
					<Stack.Screen
						name={ScreenId.Login}
						component={LoginScreen}
					/>
					<Stack.Screen
						name={ScreenId.MasterList}
						component={MasterListScreen}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		)
	}
}