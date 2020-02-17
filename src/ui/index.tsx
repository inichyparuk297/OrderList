import React, { Component } from 'react'
import { NavigationContainer, ThemeProvider } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from './loginScreen'
import MasterListScreen from './masterList'
import Master from '../engine/master'

export const ScreenId = {
	Login: "OrderList.Login",
	MasterList: "OrderList.MasterList",
	Order: "OrderList.Order"
}

export type RootStackParamList = {
	Login: undefined
	MasterList: {
		masters: Master[]
	}
}

const RootStack = createStackNavigator<RootStackParamList>()

export class Navigator extends Component {
	render() {
		return (
			<NavigationContainer>
				<RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
					<RootStack.Screen
						name="Login"
						component={LoginScreen}
					/>
					<RootStack.Screen
						name="MasterList"
						component={MasterListScreen}
					/>
				</RootStack.Navigator>
			</NavigationContainer>
		)
	}
}