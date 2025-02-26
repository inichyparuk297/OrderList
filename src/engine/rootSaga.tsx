import { spawn } from 'redux-saga/effects'

import { watchLoad as watchLoadMaster } from './master/saga'
import { watchLoad as watchLoadOrder, watchAddOrder, watchUpdateOrder, watchDeleteOrder } from './order/saga'
import { watchLoadVenders } from './vendor/saga'


export default function* rootSaga() {
	yield spawn(watchLoadMaster)
	yield spawn(watchLoadOrder)
	yield spawn(watchAddOrder)
	yield spawn(watchUpdateOrder)
	yield spawn(watchDeleteOrder)
	yield spawn(watchLoadVenders)
}