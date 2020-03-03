type VendorType = {
	param?: any
	Id?: number
	Name?: string
	DisplayName?: string
	CreatedBy?: string
	CreatedOn?: any // date	
	ModifiedBy?: string
	ModifiedOn?: any // date
}

export default class Vendor implements VendorType {
	Id = 0
	Name = "Ihar"
	DisplayName = "Ihar Nichyparuk"
	CreatedBy = "0"
	CreatedOn = new Date()
	ModifiedBy = "0"
	ModifiedOn = new Date()

	constructor(props: VendorType) {
		if (props.param) {
			this.Id = props.param.Id
			this.Name = props.param.Name
			this.DisplayName = props.param.DisplayName
			this.CreatedBy = props.param.CreatedBy
			this.CreatedOn = props.param.CreatedOn
			this.ModifiedBy = props.param.ModifiedBy
			this.ModifiedOn = props.param.ModifiedOn
		} else {
			this.Id = props.Id ? props.Id : 0
			this.Name = props.Name ? props.Name : ""
			this.DisplayName = props.DisplayName ? props.DisplayName : ""
			this.CreatedBy = props.CreatedBy ? props.CreatedBy : ""
			this.CreatedOn = props.CreatedOn ? props.CreatedOn : new Date()
			this.ModifiedBy = props.ModifiedBy ? props.ModifiedBy : ""
			this.ModifiedOn = props.ModifiedOn ? props.ModifiedOn : new Date()
		}
	}
}

export type Action = {
	type: string
	vender: Vendor | undefined
}

export type State = {
	isLoading: boolean
	venders: Vendor[]
}

export const ActionTypes = {
	LOAD: "LOAD_VENDORS"
}