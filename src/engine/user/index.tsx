import firebase from 'react-native-firebase'

type UserType = {
	username: string
	password: string
}

export default class User implements UserType {
	private static instance: User
	public static sharedInstance() {
		return this.instance || (this.instance = new this())
	}

	username = ""
	password = ""

	isVaild(): boolean {
		return (this.username.length > 0 && this.password.length > 0)
	}
}

export const Actions = {
	GOOGLELOGIN: "GOOGLELOGIN",
	GOOGLESIGNUP: "GOOGLESIGNUP"
}