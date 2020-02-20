import React from 'react'
const Lodash = require('lodash')
import Master from '.'

type MasterStateType = Master[]

const initialState: MasterStateType = [
	new Master({ Id: "0", VendorId: "ABI1", ItemNumber: "BB1023JB", Description: "- BABY GLOSSY:SAFARI CUTIES X3", Unit: "", CasePack: "", Cost: "7.20", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
	new Master({ Id: "1", VendorId: "ABI2", ItemNumber: "BB1024LG", Description: "BABY GLOSSY: TWINKLE TWINKLE X3", Unit: "", CasePack: "", Cost: "0", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
	new Master({ Id: "2", VendorId: "ABI3", ItemNumber: "BB1024XL", Description: "- BABY GLOSSY: TWINKLE TWINKLE X3", Unit: "", CasePack: "", Cost: "4.08", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
	new Master({ Id: "3", VendorId: "ABI4", ItemNumber: "BB1025JB", Description: "- BABY GLOSSY: BUNDLE OF JOY X3", Unit: "", CasePack: "", Cost: "7.20", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
	new Master({ Id: "4", VendorId: "ABI5", ItemNumber: "BB1025JB", Description: "BABY GLOSSY: BUNDLE OF JOY X3", Unit: "", CasePack: "", Cost: "0", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
	new Master({ Id: "5", VendorId: "ABI6", ItemNumber: "BB1025XL", Description: "- BABY GLOSSY: BUNDLE OF JOY X3", Unit: "", CasePack: "", Cost: "4.08", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
	new Master({ Id: "6", VendorId: "ABI7", ItemNumber: "BB1025XL", Description: "BABY GLOSSY: BUNDLE OF JOY X3", Unit: "", CasePack: "", Cost: "0", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
	new Master({ Id: "7", VendorId: "ABI8", ItemNumber: "BB1026LG", Description: "- BABY GLOSSY: SWEET KISSES X3", Unit: "", CasePack: "", Cost: "3.54", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
	new Master({ Id: "8", VendorId: "ABI9", ItemNumber: "BB1026LG", Description: "BABY GLOSSY: SWEET KISSES X3", Unit: "", CasePack: "", Cost: "0", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
	new Master({ Id: "9", VendorId: "ABI0", ItemNumber: "BB1026XL", Description: "BABY GLOSSY: SWEET KISSES X3", Unit: "", CasePack: "", Cost: "0", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
	new Master({ Id: "10", VendorId: "ABI", ItemNumber: "BB1027LG", Description: "BABY GLOSSY: HELLO LITTLE ONE X3", Unit: "", CasePack: "", Cost: "0", OrderQty: "0", CreatedBy: "0", CreatedOn: new Date(), ModifiedBy: "0", ModifiedOn: new Date() }),
]

export default function masters(state: MasterStateType = initialState, action: any) {
	return state
}