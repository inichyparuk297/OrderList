const React = require('react')
import { View, Text, StyleSheet, } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StackNavigationProp } from '@react-navigation/stack'
import { Button } from 'react-native-material-ui'

import { MainStackParamList } from '.'


type LoginScreenNavigationProps = StackNavigationProp<MainStackParamList, "Login">
type Props = {
	navigation: LoginScreenNavigationProps
}

type State = {}

class LoginScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
	}

	onLoginBtnPress = () => {
		this.props.navigation.navigate("MasterList");
	}

	render() {
		return (
			<View style={styles.container} >
				<Button accent raised primary text="Login With Google" onPress={() => { this.onLoginBtnPress() }} />
			</View>
		)
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