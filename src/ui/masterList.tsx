const React = require('react')
const { Component, useState } = require('react')
const { connect } = require('react-redux')
import {
	View,
	StyleSheet,
	Text,
	FlatList,
	TouchableOpacity,
	ScrollView,
} from 'react-native'
import { Dispatch } from 'redux'
const { ListItem, ThemeContext } = require('react-native-material-ui')
import { StackNavigationProp } from '@react-navigation/stack'

import { RootStackParamList } from '.'
import Master from '../engine/master'
import { Divider } from 'react-native-material-ui'
import { Colors } from 'react-native/Libraries/NewAppScreen'

type NavigationProps = StackNavigationProp<RootStackParamList, "MasterList">
type MasterListProps = {
	navigation: NavigationProps
	masters: Master[]
}

function MasterListScreen(props: MasterListProps) {
	props.navigation.setOptions({ headerShown: true, title: "Masters" })
	const [masters, setmasters] = useState(props.masters)

	function onMasterListItemPressed(item: Master) {
		props.navigation.navigate("OrderList", { master: item })
	}

	return (
		<View>
			<View style={masterListItemStyle.container}>
				<TouchableOpacity style={masterListItemStyle.vender}>
					<Text style={masterListItemStyle.vender}>VENDER</Text>
				</TouchableOpacity>
				<TouchableOpacity style={masterListItemStyle.item}>
					<Text style={masterListItemStyle.item}>ITEM#</Text>
				</TouchableOpacity>
				<TouchableOpacity style={masterListItemStyle.description}>
					<Text style={masterListItemStyle.description}>DESCRIPTION</Text>
				</TouchableOpacity>
				<TouchableOpacity style={masterListItemStyle.orderQuantity}>
					<Text style={masterListItemStyle.orderQuantity}>ORDER QTY</Text>
				</TouchableOpacity>
			</View>
			<ScrollView>
				<FlatList
					data={masters}
					renderItem={({ item }) =>
						<TouchableOpacity onPress={() => { onMasterListItemPressed(item) }}>
							<View style={masterListItemStyle.container}>
								<Text style={masterListItemStyle.vender}>{item.VendorId}</Text>
								<Text style={masterListItemStyle.item}>{item.ItemNumber}</Text>
								<Text style={masterListItemStyle.description}>{item.Description}</Text>
								<Text style={masterListItemStyle.orderQuantity}>{item.OrderQty}</Text>
							</View>
							<Divider />
						</TouchableOpacity>
					}
				/>
			</ScrollView>
		</View>
	);
}

const masterListItemStyle = StyleSheet.create({
	container: {
		flexDirection: "row",
		height: 40,
		paddingHorizontal: 10,
		justifyContent: "center",
	},
	vender: {
		flex: 2,
		textAlign: "left",
		alignSelf: "center",
		fontSize: 10,
	},
	item: {
		flex: 3,
		textAlign: "left",
		alignSelf: "center",
		fontSize: 10,
	},
	description: {
		flex: 9,
		alignSelf: "center",
		textAlign: "left",
		fontSize: 10,
	},
	orderQuantity: {
		flex: 3,
		alignSelf: "center",
		textAlign: "right",
		fontSize: 10,
	}
})

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