type OrderType = {
	param?: any
	Id?: string
	StoreID?: string
	VendorId: string
	ItemNumber: string
	Description: string
	OrderQty?: string
	Unit?: string
	CasePack?: string
	Cost?: string
	CreatedBy?: string
	CreatedOn?: any
	ModifiedBy?: string
	ModifiedOn?: any // date
}

export default class Order implements OrderType {
	Id = ""
	StoreID = ""
	VendorId = ""
	ItemNumber = ""
	Description = ""
	OrderQty = ""
	Unit = ""
	CasePack = ""
	Cost = ""
	CreatedOn = new Date()
	CreatedBy = ""
	ModifiedOn = new Date()
	ModifiedBy = ""

	constructor(props: OrderType) {
		if (props.param) {
			this.Id = props.param.Id
			this.StoreID = props.param.StoreID
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
			this.Id = props.Id ? props.Id : ""
			this.StoreID = props.StoreID ? props.StoreID : ""
			this.VendorId = props.VendorId
			this.ItemNumber = props.ItemNumber
			this.Description = props.Description
			this.OrderQty = props.OrderQty ? props.OrderQty : "0"
			this.Unit = props.Unit ? props.Unit : ""
			this.CasePack = props.CasePack ? props.CasePack : ""
			this.Cost = props.Cost ? props.Cost : ""
			this.CreatedBy = props.CreatedBy ? props.CreatedBy : ""
			this.CreatedOn = props.CreatedOn ? props.CreatedOn : new Date()
			this.ModifiedBy = props.ModifiedBy ? props.ModifiedBy : ""
			this.ModifiedOn = props.ModifiedOn ? props.ModifiedOn : new Date()
		}
	}
}

export const ActionType = {
	ADD_ORDER: "ADD_ORDER"
}