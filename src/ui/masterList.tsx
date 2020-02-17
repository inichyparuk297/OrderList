const React = require('react')
const { Component, useState } = require('react')
const { connect } = require('react-redux')
import {
	View,
	Text,
	StyleSheet,
	FlatList,
} from 'react-native'
import { Dispatch } from 'redux'
const { ListItem, ThemeContext } = require('react-native-material-ui')
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack'

import { RootStackParamList } from '.'
import Master from '../engine/master'

type NavigationProps = StackNavigationProp<RootStackParamList, "MasterList">
type MasterListProps = {
	navigation: NavigationProps
	masters: Master[]
}

function MasterListScreen(props: MasterListProps) {
	const [masters, setmasters] = useState(props.masters)
	return (
		<View>
			<Text>MasterListScreen </Text>
			<FlatList
				data={masters}
				renderItem={({ item }) => {
					return (
						<ListItem divider centerElement={item.venderId} />
					);
				}
				}
			/>
		</View>
	);


}

const mapStateToProps = (state: { masters: Master[]; }) => {
	return {
		masters: state.masters,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterListScreen);