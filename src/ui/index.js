import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from './loginScreen'
import OrderScreen from './orderScreen'

export const ScreenId = {
	Login: "OrderList.Login",
	Order: "OrderList.Order"
}

const Stack = createStackNavigator()

export class Navigator extends Component {
	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name={ScreenId.Login}
						component={LoginScreen}
					/>
					<Stack.Screen
						name={ScreenId.Order}
						component={OrderScreen}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		)
	}
}