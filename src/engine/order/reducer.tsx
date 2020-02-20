import React from 'react'
const Lodash = require('lodash')
import Order, { ActionType } from '.'

export type State = {
	orders: Order[]
}

const initialState: State = {
	orders: [
		new Order({ Id: "0", StoreID: "0", VendorId: "ABI", ItemNumber: "BB1023JB", Description: "- BABY GLOSSY:SAFARI CUTIES X3", Unit: "", CasePack: "", Cost: "7.20", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
		new Order({ Id: "1", StoreID: "0", VendorId: "ABI", ItemNumber: "BB1024LG", Description: "BABY GLOSSY: TWINKLE TWINKLE X3", Unit: "", CasePack: "", Cost: "0", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
		new Order({ Id: "2", StoreID: "0", VendorId: "ABI", ItemNumber: "BB1024XL", Description: "- BABY GLOSSY: TWINKLE TWINKLE X3", Unit: "", CasePack: "", Cost: "4.08", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
		new Order({ Id: "3", StoreID: "0", VendorId: "ABI", ItemNumber: "BB1025JB", Description: "- BABY GLOSSY: BUNDLE OF JOY X3", Unit: "", CasePack: "", Cost: "7.20", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
		new Order({ Id: "4", StoreID: "0", VendorId: "ABI", ItemNumber: "BB1025JB", Description: "BABY GLOSSY: BUNDLE OF JOY X3", Unit: "", CasePack: "", Cost: "0", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
		new Order({ Id: "5", StoreID: "0", VendorId: "ABI", ItemNumber: "BB1025XL", Description: "- BABY GLOSSY: BUNDLE OF JOY X3", Unit: "", CasePack: "", Cost: "4.08", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
		new Order({ Id: "6", StoreID: "0", VendorId: "ABI", ItemNumber: "BB1025XL", Description: "BABY GLOSSY: BUNDLE OF JOY X3", Unit: "", CasePack: "", Cost: "0", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
		new Order({ Id: "7", StoreID: "0", VendorId: "ABI", ItemNumber: "BB1026LG", Description: "- BABY GLOSSY: SWEET KISSES X3", Unit: "", CasePack: "", Cost: "3.54", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
		new Order({ Id: "8", StoreID: "0", VendorId: "ABI", ItemNumber: "BB1026LG", Description: "BABY GLOSSY: SWEET KISSES X3", Unit: "", CasePack: "", Cost: "0", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
		new Order({ Id: "9", StoreID: "0", VendorId: "ABI", ItemNumber: "BB1026XL", Description: "BABY GLOSSY: SWEET KISSES X3", Unit: "", CasePack: "", Cost: "0", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
		new Order({ Id: "10", StoreID: "0", VendorId: "ABI", ItemNumber: "BB1027LG", Description: "BABY GLOSSY: HELLO LITTLE ONE X3", Unit: "", CasePack: "", Cost: "0", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
	]
}

type Action = {
	type: string
	order: Order
}

export default function orders(state: State = initialState, action: Action): State {
	switch (action.type) {
		case ActionType.ADD_ORDER: {
			const newState = Lodash.cloneDeep(state)
			if (action.order) {
				newState.orders.push(action.order)
			}
			return newState
		}
		default:
			return state
	}
	return state
}