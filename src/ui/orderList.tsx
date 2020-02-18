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
const { ListItem, ThemeContext, Divider } = require('react-native-material-ui')
import { StackNavigationProp } from '@react-navigation/stack'

import { RootStackParamList } from '.'
import Order from '../engine/order'
import Master from '../engine/master'

type NavigationProps = StackNavigationProp<RootStackParamList, "MasterList">
type OrderListProps = {
	navigation: NavigationProps
	master: Master
	orders: Order[]
}

function OrderListScreen(props: OrderListProps) {
	props.navigation.setOptions({ headerShown: true, title: "Orders" })
	const [orders, setOrders] = useState(props.orders)

	return (
		<View>
			<View style={orderListItemStyle.container}>
				<TouchableOpacity style={orderListItemStyle.vender}>
					<Text style={orderListItemStyle.vender}>VENDER</Text>
				</TouchableOpacity>
				<TouchableOpacity style={orderListItemStyle.item}>
					<Text style={orderListItemStyle.item}>ITEM#</Text>
				</TouchableOpacity>
				<TouchableOpacity style={orderListItemStyle.description}>
					<Text style={orderListItemStyle.description}>DESCRIPTION</Text>
				</TouchableOpacity>
				<TouchableOpacity style={orderListItemStyle.orderQuantity}>
					<Text style={orderListItemStyle.orderQuantity}>ORDER QTY</Text>
				</TouchableOpacity>
			</View>
			<ScrollView>
				<FlatList
					data={orders}
					renderItem={({ item }) =>
						<TouchableOpacity>
							<View style={orderListItemStyle.container}>
								<Text style={orderListItemStyle.vender}>{item.VendorId}</Text>
								<Text style={orderListItemStyle.item}>{item.ItemNumber}</Text>
								<Text style={orderListItemStyle.description}>{item.Description}</Text>
								<Text style={orderListItemStyle.orderQuantity}>{item.OrderQty}</Text>
							</View>
							<Divider />
						</TouchableOpacity>
					}
				/>
			</ScrollView>
		</View>
	);
}

const orderListItemStyle = StyleSheet.create({
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

const mapStateToProps = (state: { orders: Order[]; }) => {
	return {
		orders: state.orders,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderListScreen);