import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button } from 'react-native-material-ui'
import { ScreenId } from '.'

class LoginScreen extends React.Component {
	constructor(props) {
		super(props)
		this.props.navigator
	}

	render() {
		return (
			<View style={styles.container}>
				<Button primary text="Get Started" onPress={() => this.props.navigation.push(ScreenId.MasterList)} />
			</View>
		);
	}
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