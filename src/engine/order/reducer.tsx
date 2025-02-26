import React from 'react'
const Lodash = require('lodash')
import Order, { State, Action, ActionType } from '.'
import * as Api from '../helper/api'
import firebaseService from '../firebaseService'

const initialState: State = {
	isLoading: false,
	orders: []
}

export default function orders(state: State = initialState, action: any): State {
	switch (action.type) {
		case ActionType.ADD_ORDER: {
			const newState: State = Lodash.cloneDeep(state)
			newState.isLoading = true
			return newState
		}
		case ActionType.LOAD: {
			const newState = Lodash.cloneDeep(state)
			newState.isLoading = true
			return newState
		}
		case Api.ActionType.ORDER_SUCCESS: {
			const newState: State = Lodash.cloneDeep(state)
			newState.isLoading = false
			if ((action as Api.Action).result instanceof Order) {
				const order: Order = ((action as Api.Action).result as Order)
				if (order) {
					const filterdOrders = newState.orders.filter(function (item: Order) { return item.Id === order.Id })
					if (filterdOrders.length > 0) {
						for (let i = 0; i < newState.orders.length; i++) {
							let item = newState.orders[i]
							if (item.Id === order.Id) {
								newState.orders[i] = order
							}
						}
					} else {
						newState.orders.push(order)
					}
					firebaseService.uploadOrder(order)
				}
			} else {
				newState.orders = (action as Api.Action).result as Order[]
			}

			return newState
		}
		case Api.ActionType.ORDER_FAILURE: {
			const newState = Lodash.cloneDeep(state)
			newState.isLoading = false
			return newState
		}
	}
	return state
}