import { call, put, takeLatest } from 'redux-saga/effects'

import Master, { ActionTypes, Action } from '.'
import * as Api from '../helper/api'
import { connectSqlServer, executeQuery } from '../sqlserver'
import firebaseService from '../firebaseService'

function* fetchLoad(action: Action) {
	try {
		const MSSQL = yield call(connectSqlServer)
		let query = "SELECT * FROM MasterItemList"
		const queryResult = yield call(MSSQL.executeQuery, query)
		const result: Master[] = []
		for (let i = 0; i < queryResult.length; i++) {
			let master = new Master({ param: queryResult[i] })
			yield call(firebaseService.uploadMaster, master)
			result.push(master)
		}
		yield put(Api.onMasterSuccess(result))
	} catch (error) {
		console.log(error)
		yield put(Api.onMasterFailure(error))
	}
}

export function* watchLoad() {
	yield takeLatest(ActionTypes.LOAD, fetchLoad)
}