import React, { Component } from 'react'
import { NavigationContainer, ThemeProvider } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from './loginScreen'
import MasterListScreen from './masterList'
import OrderListScreen from './orderList'

import Master from '../engine/master'
import Order from '../engine/order'

export const ScreenId = {
	Login: "OrderList.Login",
	MasterList: "OrderList.MasterList",
	OrderList: "OrderList.OrderList"
}

export type RootStackParamList = {
	Login: undefined
	MasterList: {
		masters?: Master[]
	}
	OrderList: {
		master?: Master
		orders?: Order[]
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
					<RootStack.Screen
						name="OrderList"
						component={OrderListScreen}
					/>
				</RootStack.Navigator>
			</NavigationContainer>
		)
	}
}