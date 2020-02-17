import React, { Component } from 'react'
import { View, Text, StyleSheet, } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
const { Button } = require('react-native-material-ui')
import { StackNavigationProp } from '@react-navigation/stack'

import { RootStackParamList } from '.'
import { ScreenId } from '.'


type LoginScreenNavigationProps = StackNavigationProp<RootStackParamList, "Login">
type Props = {
	navigation: LoginScreenNavigationProps
}

const LoginScreen: React.FC<Props> = (props) => {
	return (
		<View style={styles.container} >
			<Button primary text="Get Started" onPress={() => props.navigation.push("MasterList")} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	getStartContainer: {
		width: 300,
		height: 30,
		alignSelf: "center"
	},
	getStated: {
		alignItems: "stretch",
		textAlign: "center",
	}
})

export default LoginScreen