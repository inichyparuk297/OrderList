import { call, put, takeLatest } from 'redux-saga/effects'

import Master, { ActionTypes, Action } from '.'
import * as Api from '../helper/api'
import { connectSqlServer, executeQuery } from '../sqlserver'

function* fetchLoad(action: Action) {
	try {
		const MSSQL = yield call(connectSqlServer)
		let query = "SELECT * FROM MasterItemList"
		const queryResult = yield call(MSSQL.executeQuery, query)
		const result: Master[] = []
		for (let i = 0; i < queryResult.length; i++) {
			result.push(new Master({ param: queryResult[i] }))
		}
		yield put(Api.onMasterSuccess(result))
	} catch (error) {
		yield put(Api.onMasterFailure(error.response))
	}
}

export function* watchLoad() {
	yield takeLatest(ActionTypes.LOAD, fetchLoad)
}