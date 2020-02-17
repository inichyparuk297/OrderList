export default class Master {
	constructor(props) {
		let { masterId, venderId, item, description } = props

		this.masterId = masterId
		this.venderId = venderId
		this.item = item
		this.description = description
	}
}