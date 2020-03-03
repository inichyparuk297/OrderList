// import { AsyncStorage } from '@react-native-community/async-storage'
import { AsyncStorage } from 'react-native'
const { createStore, applyMiddleware } = require('redux')
import { persistStore, persistCombineReducers } from 'redux-persist'
const { createLogger } = require('redux-logger')
import createSagaMiddleware from 'redux-saga'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const logger = createLogger()
const sagaMiddleware = createSagaMiddleware()
const config = {
	key: 'root',
	storage: AsyncStorage,
}

const reducer = persistCombineReducers(config, rootReducer)

export default function configureStore() {
	let store = createStore(reducer, applyMiddleware(sagaMiddleware, logger))
	let persistor = persistStore(store)
	sagaMiddleware.run(rootSaga)

	return { store, persistor }
}