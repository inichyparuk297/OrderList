import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
} from 'react-native'
export const LoginStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name={ScreenId.Login}
					component={LoginScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

class LoginScreen extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View>
				<Text>LoginScreen</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",

	},
	login: {

	}
})

export default LoginScreen