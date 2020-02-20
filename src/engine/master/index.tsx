type MasterType = {
	param?: any
	Id: string
	VendorId: string
	ItemNumber: string
	Description: string
	OrderQty: string
	Unit: string
	CasePack: string
	Cost: string
	CreatedOn: any // date
	CreatedBy: string
	ModifiedOn: any /// date
	ModifiedBy: string
}

export default class Master implements MasterType {
	Id = "0"
	VendorId = "0"
	ItemNumber = "0"
	Description = ""
	OrderQty = "0"
	Unit = "0"
	CasePack = ""
	Cost = "0"
	CreatedOn = new Date()
	CreatedBy = "0"
	ModifiedOn = new Date()
	ModifiedBy = "0"

	constructor(props: MasterType) {
		if (props.param) {
			this.Id = props.param.Id
			this.VendorId = props.param.VendorId
			this.ItemNumber = props.param.ItemNumber
			this.Description = props.param.Description
			this.OrderQty = props.param.OrderQty
			this.Unit = props.param.Unit
			this.CasePack = props.param.CasePack
			this.Cost = props.param.Cost
			this.CreatedOn = props.param.CreatedOn
			this.CreatedBy = props.param.CreatedBy
			this.ModifiedOn = props.param.ModifiedOn
			this.ModifiedBy = props.param.ModifiedBy
		} else {
			this.Id = props.Id
			this.VendorId = props.VendorId
			this.ItemNumber = props.ItemNumber
			this.Description = props.Description
			this.OrderQty = props.OrderQty
			this.Unit = props.Unit
			this.CasePack = props.CasePack
			this.Cost = props.Cost
			this.CreatedOn = props.CreatedOn
			this.CreatedBy = props.CreatedBy
			this.ModifiedOn = props.ModifiedOn
			this.ModifiedBy = props.ModifiedBy
		}
	}
}

export const MasterSortType = {
	VendorAscending: 0,
	VendorDescending: 1,
	ItemNumberAscending: 2,
	ItemNumberDescending: 3,
	DescriptionAscending: 4,
	DescriptionDescending: 5,
	OrderQtyAscending: 6,
	OrderQtyDescending: 7,
}

export function sort(masters: Master[], sortType: number): Master[] {
	if (sortType == MasterSortType.VendorAscending || sortType == MasterSortType.VendorDescending) {
		return masters.sort((a: Master, b: Master) => {
			return (sortType == MasterSortType.VendorAscending) ? a.VendorId.localeCompare(b.VendorId) : b.VendorId.localeCompare(a.VendorId)
		})
	}

	if (sortType == MasterSortType.ItemNumberAscending || sortType == MasterSortType.ItemNumberDescending) {
		return masters.sort((a: Master, b: Master) => {
			return (sortType == MasterSortType.ItemNumberAscending) ? a.ItemNumber.localeCompare(b.ItemNumber) : b.ItemNumber.localeCompare(a.ItemNumber)
		})
	}

	if (sortType == MasterSortType.DescriptionAscending || sortType == MasterSortType.DescriptionDescending) {
		return masters.sort((a: Master, b: Master) => {
			return (sortType == MasterSortType.DescriptionAscending) ? a.Description.localeCompare(b.Description) : b.Description.localeCompare(a.Description)
		})
	}

	if (sortType == MasterSortType.OrderQtyAscending || sortType == MasterSortType.OrderQtyDescending) {
		return masters.sort((a: Master, b: Master) => {
			return (sortType == MasterSortType.OrderQtyAscending) ? a.OrderQty.localeCompare(b.OrderQty) : b.OrderQty.localeCompare(a.OrderQty)
		})
	}

	return masters
}