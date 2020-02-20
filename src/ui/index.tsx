import React, { Component } from 'react'
import { NavigationContainer, ThemeProvider } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from './loginScreen'
import MasterListScreen from './masterList'
import OrderListScreen from './orderList'
import AddOrderScreen from './addOrder'

import Master from '../engine/master'
import Order from '../engine/order'
import Vendor from '../engine/vendor'

export const ScreenId = {
	Login: "Login",
	MasterList: "MasterList",
	OrderList: "OrderList",
	AddOrder: "AddOrder",
}

export type MainStackParamList = {
	Main: undefined
	Login: undefined
	MasterList: {
		masters?: Master[]
	}
	OrderList: {
		master?: Master
		orders?: Order[]
	}
	AddOrder: {
		vendors: Vendor[]
	}
}

const MainStack = createStackNavigator<MainStackParamList>()
const RootStack = createStackNavigator<MainStackParamList>();

function MainStackScreen() {
	return (
		<MainStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
			<MainStack.Screen
				name="Login"
				component={LoginScreen}
			/>
			<MainStack.Screen
				name="MasterList"
				component={MasterListScreen}
			/>
			<MainStack.Screen
				name="OrderList"
				component={OrderListScreen}
			/>
		</MainStack.Navigator>
	)
}


export class Navigator extends Component {
	render() {
		return (
			<NavigationContainer>
				<RootStack.Navigator mode="modal" >
					<RootStack.Screen
						name="Main"
						component={MainStackScreen}
						options={{ headerShown: false }}
					/>
					<RootStack.Screen
						name="AddOrder"
						component={AddOrderScreen}
					/>
				</RootStack.Navigator>
			</NavigationContainer >
		)
	}
}