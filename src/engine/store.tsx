// import { AsyncStorage } from '@react-native-community/async-storage'
import { AsyncStorage } from 'react-native'
const { createStore, applyMiddleware } = require('redux')
import { persistStore, persistCombineReducers } from 'redux-persist'
const { createLogger } = require('redux-logger')

import rootReducer from './rootReducer'

const logger = createLogger()
const config = {
	key: 'root',
	storage: AsyncStorage,
}

const reducer = persistCombineReducers(config, rootReducer)

export default function configureStore() {
	let store = createStore(reducer, applyMiddleware(logger))
	let persistor = persistStore(store)

	return { store, persistor }
}