const Lodash = require('lodash')
import User, { State, Action, ActionTypes } from '.'
import * as Api from '../helper/api'

const initialState: State = {
	user: new User()
}

export default function user(state: State = initialState, action: Action): State {
	switch (action.type) {
		case ActionTypes.LOGIN: {
			const newState: State = Lodash.cloneDeep(state)
			if (action.payload) {
				newState.user.username = (action.payload as User).username
				newState.user.password = (action.payload as User).password
			}
			return newState
		}
		case ActionTypes.SIGNUP: {
			const newState: State = Lodash.cloneDeep(state)
			if (action.payload) {
				newState.user.username = (action.payload as User).username
				newState.user.password = (action.payload as User).password
			}
			return newState
		}
	}
	return state
}