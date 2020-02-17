interface IMaster {
	masterId: string;
	venderId: string;
	item: string;
	description: string;
}

export default class Master implements IMaster {
	masterId = ""
	venderId = ""
	item = ""
	description = ""

	constructor(props: any) {
		let { masterId, venderId, item, description } = props

		this.masterId = masterId
		this.venderId = venderId
		this.item = item
		this.description = description
	}
}