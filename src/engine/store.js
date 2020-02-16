// import { AsyncStorage } from '@react-native-community/async-storage'
import { AsyncStorage } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import logger from 'redux-logger';

import rootReducer from './rootReducer'

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