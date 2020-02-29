const Lodash = require('lodash')
import User, { Actions } from '.'
import firebase from 'react-native-firebase'

type State = {
	loading: boolean
	user: User
	error: string | undefined
}

type Action = {
	type: string
	email: string
	password: string
}

const initialState: State = {
	loading: false,
	user: User.sharedInstance(),
	error: undefined
}

export default function users(state: State = initialState, action: Action): State {
	switch (action.type) {
		case Actions.GOOGLELOGIN: {
			const newState = Lodash.cloneDeep(state)
			return newState
		}
		case Actions.GOOGLESIGNUP: {
			const newState = Lodash.cloneDeep(state)
			try {

			} catch (e) {
				newState.error = e.message
			}
			return newState
		}
	}
	return state
}