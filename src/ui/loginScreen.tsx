const React = require('react')
import { View, Text, StyleSheet, } from 'react-native'
import auth from '@react-native-firebase/auth'
import { GoogleSignin, statusCodes, User } from '@react-native-community/google-signin'
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
		GoogleSignin.configure()
		auth().onAuthStateChanged(this.onAuthStateChanged)
	}

	onAuthStateChanged = (user: any) => {
		if (user) {
			this.props.navigation.navigate("MasterList");
		}
	}

	onLoginBtnPress = async () => {
		/*
		GoogleSignin.hasPlayServices().then(() => {
			GoogleSignin.signIn().then((userInfo: User) => {
				this.onAuthStateChanged(userInfo)
			}).catch((error: any) => {
				console.log(error)
			})
		}).catch((error: any) => {
			console.log(error)
		})
		*/

		try {
			await auth().createUserWithEmailAndPassword("inichyparuk297@gmail.com", "gmEpsL8eNRTNzFM")
		} catch (error) {
			console.log(error)
		}
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