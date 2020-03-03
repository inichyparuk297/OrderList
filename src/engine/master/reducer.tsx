import React from 'react'
const Lodash = require('lodash')
import Master, { State, Action, ActionTypes } from '.'
import * as Api from '../helper/api'

const initialState: State = {
	isLoading: false,
	masters: []
}

export default function masters(state: State = initialState, action: any) {
	switch (action.type) {
		case ActionTypes.LOAD: {
			const newState: State = Lodash.cloneDeep(state)
			newState.isLoading = true
			return newState
		}
		case Api.ActionType.MASTER_SUCCESS: {
			const newState: State = Lodash.cloneDeep(state)
			newState.isLoading = false
			newState.masters = ((action as Api.Action).result as Master[])
			return newState
		}
		case Api.ActionType.MASTER_FAILURE: {
			const newState: State = Lodash.cloneDeep(state)
			newState.isLoading = false
			newState.masters = []
			return newState
		}
	}
	return state
}