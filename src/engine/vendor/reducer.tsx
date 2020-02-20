import React from 'react'
const Lodash = require('lodash')
import Vendor from '.'

type VendorStateType = Vendor[]

const initialState: VendorStateType = [
	new Vendor({ Id: "0", Name: "ABI1", DisplayName: "BB1023JB", CreatedBy: "", CreatedOn: new Date(), ModifiedBy: "", ModifiedOn: new Date() }),
	new Vendor({ Id: "1", Name: "ABI2", DisplayName: "BB1024LG", CreatedBy: "", CreatedOn: new Date(), ModifiedBy: "", ModifiedOn: new Date() }),
	new Vendor({ Id: "2", Name: "ABI3", DisplayName: "BB1024XL", CreatedBy: "", CreatedOn: new Date(), ModifiedBy: "", ModifiedOn: new Date() }),
	new Vendor({ Id: "3", Name: "ABI4", DisplayName: "BB1025JB", CreatedBy: "", CreatedOn: new Date(), ModifiedBy: "", ModifiedOn: new Date() }),
	new Vendor({ Id: "4", Name: "ABI5", DisplayName: "BB1025JB", CreatedBy: "", CreatedOn: new Date(), ModifiedBy: "", ModifiedOn: new Date() }),
	new Vendor({ Id: "5", Name: "ABI6", DisplayName: "BB1025XL", CreatedBy: "", CreatedOn: new Date(), ModifiedBy: "", ModifiedOn: new Date() }),
	new Vendor({ Id: "6", Name: "ABI7", DisplayName: "BB1025XL", CreatedBy: "", CreatedOn: new Date(), ModifiedBy: "", ModifiedOn: new Date() }),
	new Vendor({ Id: "7", Name: "ABI8", DisplayName: "BB1026LG", CreatedBy: "", CreatedOn: new Date(), ModifiedBy: "", ModifiedOn: new Date() }),
	new Vendor({ Id: "8", Name: "ABI9", DisplayName: "BB1026LG", CreatedBy: "", CreatedOn: new Date(), ModifiedBy: "", ModifiedOn: new Date() }),
	new Vendor({ Id: "9", Name: "ABI10", DisplayName: "BB1026XL", CreatedBy: "", CreatedOn: new Date(), ModifiedBy: "", ModifiedOn: new Date() }),
	new Vendor({ Id: "10", Name: "ABI11", DisplayName: "BB1027LG", CreatedBy: "", CreatedOn: new Date(), ModifiedBy: "", ModifiedOn: new Date() }),
]

export default function vendors(state: VendorStateType = initialState, action: any) {
	return state
}