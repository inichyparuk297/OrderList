const React = require('react')
const { connect } = require('react-redux')
import {
	View,
	Text,
	TextInput,
	StyleSheet,
} from 'react-native'
import { Dispatch } from 'redux'
import auth from '@react-native-firebase/auth'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StackNavigationProp } from '@react-navigation/stack'
import { Button } from 'react-native-material-ui'
const { PropTypes } = require('prop-types');

import { MainStackParamList } from '.'
import User, {
	State as UserState,
	Action as UserAction,
	ActionTypes as UserActionTypes
} from '../engine/user'


type LoginScreenNavigationProps = StackNavigationProp<MainStackParamList, "Login">
type Props = {
	navigation: LoginScreenNavigationProps
}

type State = {
	username: string
	password: string
}

class LoginScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			username: this.props.user.username,
			password: this.props.user.password
		}

		auth().onAuthStateChanged(this.onAuthStateChanged)
	}

	onAuthStateChanged = (user: any) => {
		if (user) {
			this.props.login(this.state.username, this.state.password)
			this.props.navigation.navigate("MasterList");
		}
	}

	onLoginBtnPressed = async () => {
		const username = this.state.username
		const password = this.state.password
		if (!username || username == "" || !password || password == "") {
			return
		}

		try {
			await auth().signInWithEmailAndPassword(this.state.username, this.state.password)
		} catch (error) {
			alert(error)
		}
	}

	onSignupBtnPressed = async () => {
		const username = this.state.username
		const password = this.state.password
		if (!username || username == "" || !password || password == "") {
			return
		}

		try {
			await auth().createUserWithEmailAndPassword(this.state.username, this.state.password)
		} catch (error) {
			alert(error)
		}
	}

	render() {
		return (
			<View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
				<View style={styles.container}>
					<TextInput
						style={styles.email}
						placeholder="Email"
						placeholderTextColor='gray'
						value={this.state.username}
						onChangeText={text => {
							this.setState({ username: text });
						}}
					/>
					<TextInput
						secureTextEntry={true}
						style={styles.email}
						placeholder="Password"
						placeholderTextColor='gray'
						value={this.state.password}
						onChangeText={text => {
							this.setState({ password: text });
						}}
					/>
					<View style={styles.login}>
						<Button accent raised primary text="Log in" onPress={() => { this.onLoginBtnPressed() }} />
					</View>
					<View style={styles.signup}>
						<Button accent raised primary text="Sign up" onPress={() => { this.onSignupBtnPressed() }} />
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		left: 10,
		right: 10,
		padding: 10,
		flexDirection: "column",
		alignSelf: "center",
		backgroundColor: 'rgba(255,255,255,0)'
	},
	email: {
		padding: 10,
		color: 'rgba(0,0,0,1)',
		fontSize: 20,
		width: 300
	},
	login: {
		marginTop: 30
	},
	signup: {
		marginTop: 10
	}
})

const mapStateToProps = (state: { user: UserState; }) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		login: (username: string, password: string) => { dispatch({ type: UserActionTypes.LOGIN, payload: { username: username, password: password } }) },
		signup: (username: string, password: string) => { dispatch({ type: UserActionTypes.SIGNUP, payload: { username: username, password: password } }) }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)