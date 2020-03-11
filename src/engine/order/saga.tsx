import { call, put, takeLatest } from 'redux-saga/effects'
import { firebase } from '@react-native-firebase/auth'

import Order, { ActionType, Action } from '.'
import Master, { ActionTypes as MasterActionTypes } from '../master'
import * as Api from '../helper/api'
import { connectSqlServer, executeQuery } from '../sqlserver'
import firebaseService from '../firebaseService'

function* fetchLoad(action: Action) {
	try {
		const MSSQL = yield call(connectSqlServer)
		let query = `SELECT * FROM OrderItemList WHERE CreatedBy Like \'${firebase.auth().currentUser?.email}\';`
		const queryResult = yield call(MSSQL.executeQuery, query)
		const result: Order[] = []
		for (let i = 0; i < queryResult.length; i++) {
			const order: Order = new Order({ param: queryResult[i] })
			firebaseService.uploadOrder(order)
			result.push(order)
		}
		yield put({ type: MasterActionTypes.LOAD })
		yield put(Api.onOrderSuccess(result))
	} catch (error) {
		yield put(Api.onOrderFailure(error.response))
	}
}

function* addOrder(action: Action) {
	try {
		const query = `INSERT INTO OrderItemList (VendorId, ItemNumber, Description, OrderQty, Unit, CasePack, Cost, CreatedBy, CreatedOn) VALUES (${action.order.VendorId}, \'${action.order.ItemNumber}\', \'${action.order.Description}\', ${action.order.OrderQty}, \'${action.order.Unit}\', \'${action.order.CasePack}\', ${action.order.Cost}, \'${action.order.CreatedBy}\', GETDATE());`
		console.log(query)
		const rows = yield call(executeQuery, query)
		yield put(Api.onOrderSuccess(rows[0]))
	} catch (error) {
		yield put(Api.onOrderSuccess(action.order))
		yield put(Api.onOrderFailure(error))
	}
}

function* updateOrder(action: Action) {
	try {
		const query = `UPDATE OrderItemList SET ModifiedOn = GETDATE(), ModifiedBy='${action.order.ModifiedBy}', OrderQty=${action.order.OrderQty} WHERE Id=${action.order.Id};`
		console.log(query)
		const rows = yield call(executeQuery, query)
		yield put(Api.onOrderSuccess(rows[0]))
	} catch (error) {
		yield put({ type: ActionType.LOAD })
		yield put(Api.onOrderFailure(error))
	}
}

function* deleteOrder(action: Action) {
	try {
		const query = `DELETE FROM OrderItemList WHERE Id=${action.order.Id};`
		console.log(query)
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

export function* watchUpdateOrder() {
	yield takeLatest(ActionType.UPDATE_ORDER, updateOrder)
}

export function* watchDeleteOrder() {
	yield takeLatest(ActionType.DELETE_ORDER, deleteOrder)
}