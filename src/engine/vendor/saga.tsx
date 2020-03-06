import { call, put, takeLatest } from 'redux-saga/effects'

import Vender, { State, Action, ActionTypes } from '.'
import * as Api from '../helper/api'
import { connectSqlServer, executeQuery } from '../sqlserver'
import firebaseService from '../firebaseService'

function* loadVendors(action: Action) {
	try {
		const MSSQL = yield call(connectSqlServer)
		let query = "SELECT * FROM Vendor"
		const queryResult = yield call(MSSQL.executeQuery, query)
		const result: Vender[] = []
		for (let i = 0; i < queryResult.length; i++) {
			const vendor: Vender = new Vender({ param: queryResult[i] })
			yield call(firebaseService.uploadVendor, vendor)
			result.push(vendor)
		}
		yield put(Api.onVendorSuccess(result))
	} catch (error) {
		yield put(Api.onVendorFailure(error.response))
	}
}

export function* watchLoadVenders() {
	yield takeLatest(ActionTypes.LOAD, loadVendors)
}