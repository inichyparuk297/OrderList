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
	ActivityIndicator,
} from 'react-native'
import { Dispatch } from 'redux'
const { ListItem, ThemeContext, Divider } = require('react-native-material-ui')
import Icon from 'react-native-vector-icons/FontAwesome'
import { StackNavigationProp } from '@react-navigation/stack'

import { MainStackParamList, ScreenId } from '.'
import Order, { State as OrderState, ActionType as OrderActionType } from '../engine/order'
import Master from '../engine/master'

type NavigationProps = StackNavigationProp<MainStackParamList, "MasterList">
type Props = {
	navigation: NavigationProps
	master: Master
	orders: OrderState
}

type State = {
	orders: Order[]
}

class OrderListScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.props.navigation.setOptions({
			headerShown: true, title: "Orders",
			headerRight: () => (
				<TouchableOpacity style={styles.add} onPress={() => props.navigation.navigate("AddOrder")}>
					<Icon name="plus" size={20} />
				</TouchableOpacity>
			)
		})
	}

	componentDidMount() {
		this.props.loadOrder()
	}

	render() {
		return (
			<View>
				{this.props.orders.isLoading && <ActivityIndicator />}
				<View style={orderListHeaderStyle.container}>
					<TouchableOpacity style={orderListHeaderStyle.venderContainer}>
						<Text style={orderListHeaderStyle.vender}>VENDER</Text>
					</TouchableOpacity>
					<TouchableOpacity style={orderListHeaderStyle.itemContainer}>
						<Text style={orderListHeaderStyle.item}>ITEM#</Text>
					</TouchableOpacity>
					<TouchableOpacity style={orderListHeaderStyle.descriptionContainer}>
						<Text style={orderListHeaderStyle.description}>DESCRIPTION</Text>
					</TouchableOpacity>
					<TouchableOpacity style={orderListHeaderStyle.orderQuantityContainer}>
						<Text style={orderListHeaderStyle.orderQuantity}>ORDER QTY</Text>
					</TouchableOpacity>
				</View>
				<ScrollView>
					<FlatList
						data={this.props.orders.orders}
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
		)
	}
}

const styles = StyleSheet.create({
	add: {
		marginRight: 20,
	},
})

const orderListHeaderStyle = StyleSheet.create({
	container: {
		flexDirection: "row",
		height: 40,
		paddingHorizontal: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	venderContainer: {
		flex: 2,
		flexDirection: "row",
	},
	itemContainer: {
		flex: 3,
		flexDirection: "row",
	},
	descriptionContainer: {
		flex: 9,
		flexDirection: "row",
	},
	orderQuantityContainer: {
		flex: 3,
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	vender: {
		textAlign: "left",
		alignSelf: "center",
		fontSize: 10,
	},
	item: {
		textAlign: "left",
		alignSelf: "center",
		fontSize: 10,
	},
	description: {
		alignSelf: "center",
		textAlign: "left",
		fontSize: 10,
	},
	orderQuantity: {
		alignSelf: "center",
		textAlign: "right",
		fontSize: 10,
	}
})

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

const mapStateToProps = (state: { orders: OrderState; }) => {
	return {
		orders: state.orders,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		loadOrder: () => { dispatch({ type: OrderActionType.LOAD }) }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderListScreen);