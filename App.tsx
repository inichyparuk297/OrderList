import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui'

import configureStore from './src/engine/store'
import { Navigator, ScreenId } from './src/ui'

const { store, persistor } = configureStore()

const uiTheme = {
	palette: {
		primaryColor: COLOR.green500,
		accentColor: COLOR.pink500,
	},
	listItem: {
		primaryText: {
			color: COLOR.black
		}
	}
};

const App: React.ReactNode = () => {
	const theme = getTheme(uiTheme)
	return (
		<ThemeContext.Provider value={theme}>
			<Provider store={store}>
				{/* <PersistGate loading={null} persistor={persistor}> */}
				<Navigator />
				{/* </PersistGate> */}
			</Provider>
		</ThemeContext.Provider>
	)
}

export default App;
