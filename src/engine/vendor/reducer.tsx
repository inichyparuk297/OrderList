import React from 'react'
const Lodash = require('lodash')
import Vendor, { State, Action, ActionTypes } from '.'
import * as Api from '../helper/api'

const initialState: State = {
	isLoading: false,
	venders: []
}

export default function vendors(state: State = initialState, action: any) {
	switch (action.type) {
		case ActionTypes.LOAD: {
			const newState: State = Lodash.cloneDeep(state)
			newState.isLoading = true
			return newState
		}
		case Api.ActionType.VENDOR_SUCCESS: {
			const newState: State = Lodash.cloneDeep(state)
			newState.isLoading = false
			newState.venders = (action as Api.Action).result as Vendor[]
			return newState
		}
		case Api.ActionType.VENDOR_FAILURE: {
			const newState: State = Lodash.cloneDeep(state)
			newState.isLoading = false
			return newState
		}
	}
	return state
}