type VendorType = {
	param?: any
	Id: string
	Name: string
	DisplayName: string
	CreatedBy: string
	CreatedOn: any // date	
	ModifiedBy: string
	ModifiedOn: any // date
}

export default class Vendor implements VendorType {
	Id = "0"
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
			this.Id = props.Id
			this.Name = props.Name
			this.DisplayName = props.DisplayName
			this.CreatedBy = props.CreatedBy
			this.CreatedOn = props.CreatedOn
			this.ModifiedBy = props.ModifiedBy
			this.ModifiedOn = props.ModifiedOn
		}
	}
}