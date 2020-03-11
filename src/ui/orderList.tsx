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
import ActionSheet from 'react-native-actionsheet'
const { ListItem, ThemeContext, Divider } = require('react-native-material-ui')
import Icon from 'react-native-vector-icons/FontAwesome'
import { StackNavigationProp } from '@react-navigation/stack'

import { MainStackParamList, ScreenId } from '.'
import Order, { State as OrderState, ActionType as OrderActionType } from '../engine/order'
import Master, { State as MasterState, ActionTypes as MasterActionTypes } from '../engine/master'

type NavigationProps = StackNavigationProp<MainStackParamList, "MasterList">
type Props = {
	navigation: NavigationProps
	master: Master
	orders: OrderState
}

type State = {
	orders: Order[]
	selectedOrder: Order
}

class OrderListScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.props.navigation.setOptions({
			headerShown: true, title: "Orders",
			headerRight: () => (
				<TouchableOpacity style={styles.add} onPress={this.onAddOrderBtnPressed}>
					<Icon name="plus" size={20} />
				</TouchableOpacity>
			)
		})
	}

	componentDidMount() {
		this.props.loadOrder()
	}

	onAddOrderBtnPressed = () => {
		this.props.navigation.navigate("MasterList")
	}

	onOrderItemPressed = (item: Order) => {
		this.setState({ selectedOrder: item })
		this.actionSheet.show()
	}

	onEditPressed = () => {
		this.props.navigation.navigate("UpdateOrder", { order: this.state.selectedOrder })
	}

	onDeletePressed = () => {
		this.deleteConfirmActionSheet.show()
	}

	onDeleteConfirmPressed = () => {
		this.props.deleteOrder(this.state.selectedOrder)
	}

	render() {
		return (
			<View>
				{(this.props.orders.isLoading || this.props.masters.isLoading) && <ActivityIndicator />}
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
							<TouchableOpacity onPress={() => { this.onOrderItemPressed(item) }}>
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
				<ActionSheet
					ref={o => this.actionSheet = o}
					title=""
					options={['Add', 'Edit', 'Delete', 'Cancel']}
					cancelButtonIndex={3}
					destructiveButtonIndex={2}
					onPress={(index) => {
						switch (index) {
							case 0: {
								this.props.navigation.navigate("MasterList")
								return
							}
							case 1: {
								this.onEditPressed();
								return
							}
							case 2: {
								this.onDeletePressed();
								return
							}
						}
					}}
				/>
				<ActionSheet
					ref={o => this.deleteConfirmActionSheet = o}
					title="Are you sure want to delete the order?"
					options={['YES', 'NO']}
					cancelButtonIndex={1}
					destructiveButtonIndex={0}
					onPress={(index) => {
						switch (index) {
							case 0: {
								this.onDeleteConfirmPressed()
								return
							}
						}
					}}
				/>
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

const mapStateToProps = (state: { orders: OrderState, masters: MasterState }) => {
	return {
		masters: state.masters,
		orders: state.orders,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		loadOrder: () => { dispatch({ type: OrderActionType.LOAD }) },
		deleteOrder: (order: Order) => { dispatch({ type: OrderActionType.DELETE_ORDER, order: order }) }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderListScreen);