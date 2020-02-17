import React from 'react'
import * as Lodash from 'lodash'
import Master from '.'

const initialState = [
	new Master({ masterId: "0", venderId: "0", item: "0", description: "Description 0" }),
	new Master({ masterId: "1", venderId: "1", item: "1", description: "Description 1" }),
	new Master({ masterId: "2", venderId: "2", item: "2", description: "Description 2" }),
	new Master({ masterId: "3", venderId: "3", item: "3", description: "Description 3" }),
	new Master({ masterId: "4", venderId: "4", item: "4", description: "Description 4" }),
	new Master({ masterId: "5", venderId: "5", item: "5", description: "Description 5" }),
]

export default function masters(state = initialState, action) {
	return state
}