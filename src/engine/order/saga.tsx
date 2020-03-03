import { call, put, takeLatest } from 'redux-saga/effects'

import Order, { ActionType, Action } from '.'
import * as Api from '../helper/api'
import { connectSqlServer, executeQuery } from '../sqlserver'

function* fetchLoad(action: Action) {
	try {
		const MSSQL = yield call(connectSqlServer)
		let query = "SELECT * FROM OrderItemList"
		const queryResult = yield call(MSSQL.executeQuery, query)
		const result: Order[] = []
		for (let i = 0; i < queryResult.length; i++) {
			result.push(new Order({ param: queryResult[i] }))
		}
		yield put(Api.onOrderSuccess(result))
	} catch (error) {
		yield put(Api.onOrderFailure(error.response))
	}
}

function* addOrder(action: Action) {
	try {
		const query = `INSERT INTO OrderItemList (VendorId, ItemNumber, Description, OrderQty, Unit, CasePack, Cost) VALUES (${action.order.VendorId}, \'${action.order.ItemNumber}\', \'${action.order.Description}\', ${action.order.OrderQty}, \'${action.order.Unit}\', \'${action.order.CasePack}\', ${action.order.Cost});`
		const rows = yield call(executeQuery, query)
		yield put(Api.onOrderSuccess(rows[0]))
	} catch (error) {
		yield put({ type: ActionType.LOAD })
		yield put(Api.onOrderFailure(error))
	}
}

export function* watchLoad() {
	yield takeLatest(ActionType.LOAD, fetchLoad)
}

export function* watchAddOrder() {
	yield takeLatest(ActionType.ADD_ORDER, addOrder)
}