import Master from "../master"

type OrderType = {
	param?: any
	Id?: number
	VendorId?: number
	ItemNumber?: string
	Description?: string
	OrderQty?: number
	Unit?: string
	CasePack?: string
	Cost?: number
	CreatedBy?: string | null
	CreatedOn?: any
	ModifiedBy?: string
	ModifiedOn?: any // date
}

export default class Order implements OrderType {
	Id = 0
	VendorId = 0
	ItemNumber = ""
	Description = ""
	OrderQty = 0
	Unit = ""
	CasePack = ""
	Cost = 0
	CreatedOn = new Date()
	CreatedBy = ""
	ModifiedOn = new Date()
	ModifiedBy = ""

	constructor(props: OrderType) {
		if (props.param) {
			this.Id = props.param.Id
			this.VendorId = props.param.VendorId
			this.ItemNumber = props.param.ItemNumber
			this.Description = props.param.Description
			this.OrderQty = props.param.OrderQty
			this.Unit = props.param.Unit
			this.CasePack = props.param.CasePack
			this.Cost = props.param.Cost
			this.CreatedBy = props.param.CreatedBy
			this.CreatedOn = props.param.CreatedOn
			this.ModifiedBy = props.param.ModifiedBy
			this.ModifiedOn = props.param.ModifiedOn
		} else {
			this.Id = props.Id ? props.Id : 0
			this.VendorId = props.VendorId ? props.VendorId : 0
			this.ItemNumber = props.ItemNumber ? props.ItemNumber : ""
			this.Description = props.Description ? props.Description : ""
			this.OrderQty = props.OrderQty ? props.OrderQty : 0
			this.Unit = props.Unit ? props.Unit : ""
			this.CasePack = props.CasePack ? props.CasePack : ""
			this.Cost = props.Cost ? props.Cost : 0
			this.CreatedBy = props.CreatedBy ? props.CreatedBy : ""
			this.CreatedOn = props.CreatedOn ? props.CreatedOn : new Date()
			this.ModifiedBy = props.ModifiedBy ? props.ModifiedBy : ""
			this.ModifiedOn = props.ModifiedOn ? props.ModifiedOn : new Date()
		}
	}
}

export type State = {
	isLoading: boolean
	orders: Order[]
}

export type Action = {
	type: string
	order: Order
}

export const ActionType = {
	ADD_ORDER: "ADD_ORDER",
	LOAD: "LOAD_ORDER",
}