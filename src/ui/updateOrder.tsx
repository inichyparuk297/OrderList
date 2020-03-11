import React, { Component } from 'react'
import {
	View,
	Text,
	TextInput,
	StyleSheet,
} from 'react-native'
const { connect } = require('react-redux')
import { Dispatch } from 'redux'
import { firebase } from '@react-native-firebase/auth'
import { StackNavigationProp } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/FontAwesome'
const { Button } = require('react-native-material-ui')
import RNPickerSelect from 'react-native-picker-select';

import { MainStackParamList } from '.'
import Vendor, {
	State as VendorState,
	ActionTypes as VendorActionTypes
} from '../engine/vendor'
import Order, { State as OrderState, ActionType as OrderActionType } from '../engine/order'
import Master, {
	State as MasterState
} from '../engine/master'
import User, {
	State as UserState
} from '../engine/user'
import masters from '../engine/master/reducer'
import { Route } from '@react-navigation/native'

type NavigationProps = StackNavigationProp<MainStackParamList, "AddOrder">
type Props = {
	route: Route
	navigation: NavigationProps
	order: Order
	masters: Master[]
	updateOrder: any
}

type State = {
	order: Order
	master?: Master
	orderQty: string
}

class UpdateOrderScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.props.navigation.setOptions({ headerShown: false, cardStyle: { backgroundColor: 'rgba(0,0,0,0.8)', opacity: 1 } })

		const { route } = this.props
		const { order } = route.params

		this.state = {
			master: undefined,
			order: order,
			orderQty: (order as Order).OrderQty.toString(),
		}

		this.onUpdateBtnPressed = this.onUpdateBtnPressed.bind(this)
	}

	onOrderQuantityChanged = (value: string) => {
		if (value === "") {
			this.setState({ orderQty: "0" })
			return
		}

		let quantity = parseInt(value).toString()
		const totalQuantity = this.state.master!.OrderQty
		if (parseInt(value) > totalQuantity) {
			quantity = totalQuantity.toString()
		}

		this.setState({ orderQty: quantity })
	}

	onUpdateBtnPressed() {
		const orderQuantity = parseInt(this.state.orderQty)
		if (orderQuantity <= 0) {
			alert("Order Quantity must be 1 at least or greater.")
			return
		}

		const currentUser = firebase.auth().currentUser

		const order = this.state.order
		order.OrderQty = orderQuantity
		order.ModifiedBy = (currentUser) ? currentUser.email : ""

		this.props.updateOrder(order)
		this.props.navigation.goBack()
	}

	findMaster() {
		const order = this.state.order
		const masters = this.props.masters.filter(function (master: Master) {
			if (master.VendorId === order.VendorId && master.ItemNumber === order.ItemNumber && master.Description === order.Description) {
				return true
			}
			return false
		})
		if (masters.length > 0) {
			return masters[0]
		}
		return undefined
	}

	render() {
		const master = this.findMaster()
		if (!this.state.master && master) {
			this.setState({ master: master })
		}
		return (
			<View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
				<View style={styles.container}>
					<Text style={styles.title}>Edit Order</Text>
					<View style={styles.subContainer}>
						<Text style={styles.subTitle} numberOfLines={1}>Vendor ID:</Text>
						<Text style={styles.subText} numberOfLines={1}>{this.state.master && this.state.master.VendorId}</Text>
					</View>
					<View style={styles.subContainer}>
						<Text style={styles.subTitle} numberOfLines={1}>Item Number:</Text>
						<Text style={styles.subTitle} numberOfLines={1}>{this.state.master && this.state.master.ItemNumber}</Text>
					</View>
					<View style={styles.subContainer}>
						<Text style={styles.subTitle} numberOfLines={1}>Description:</Text>
						<Text style={styles.subTitle} numberOfLines={1}>{this.state.master && this.state.master.Description}</Text>
					</View>
					<View style={styles.subContainer}>
						<Text style={styles.subTitle} numberOfLines={1}>Total Quantity:</Text>
						<Text style={styles.subTitle} numberOfLines={1}>{this.state.master && this.state.master.OrderQty}</Text>
					</View>
					<View style={styles.subContainer}>
						<Text style={styles.subTitle} numberOfLines={1}>Order Quantity:</Text>
						<TextInput
							style={styles.subText}
							numberOfLines={1}
							keyboardType="number-pad"
							placeholder="Order Quanity"
							placeholderTextColor='gray'
							value={this.state.orderQty}
							onChangeText={text => {
								this.onOrderQuantityChanged(text)
							}}
						/>
					</View>
					<View style={styles.buttonContainer}>
						<Button raised primary style={styles.cancel} text="Cancel" onPress={() => this.props.navigation.goBack()} />
						<Button raised primary style={styles.add} text="Change" onPress={this.onUpdateBtnPressed} />
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginLeft: 20,
		marginRight: 20,
		flexDirection: "column",
		backgroundColor: 'rgba(255,255,255,1)'
	},
	title: {
		padding: 20,
		color: 'rgba(0,0,0,1)',
		fontSize: 20,
		textAlign: "center",
	},
	subContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},
	subTitle: {
		flex: 1,
		padding: 10,
		color: 'rgba(0,0,0,1)',
		fontSize: 15,
	},
	subText: {
		flex: 1,
		padding: 10,
		color: 'rgba(0,0,0,1)',
		fontSize: 15,
	},
	buttonContainer: {
		margin: 20,
		flexDirection: "row",
		justifyContent: "space-evenly"
	},
	cancel: {
		flex: 1,
		marginLeft: 20,
	},
	add: {
		flex: 1,
		marginRight: 20,
	}
})

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 20,
		color: 'rgba(0,0,0,1)',
	},
	inputAndroid: {
		fontSize: 16,
		color: 'rgba(0,0,0,1)',
	},
});

const mapStateToProps = (state: { vendors: VendorState, user: UserState, masters: MasterState, orders: OrderState }) => {
	return {
		masters: state.masters.masters
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		updateOrder: (order: Order) => dispatch({ type: OrderActionType.UPDATE_ORDER, order: order })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOrderScreen);