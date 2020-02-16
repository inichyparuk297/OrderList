/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from './src/engine/store'
import { Navigator, ScreenId } from './src/ui'

const { store, persistor } = configureStore()

class App extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Navigator />
				</PersistGate>
			</Provider>
		)
	}
}

export default App;
