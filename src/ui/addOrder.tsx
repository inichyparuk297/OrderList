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

type NavigationProps = StackNavigationProp<MainStackParamList, "AddOrder">
type Props = {
	navigation: NavigationProps
	vendors: VendorState
	addOrder: any
	loadVendors: any
	master: Master
	user: User
	selectedMaster: Master
	orders: OrderState
}

type State = {
	vendor?: Vendor
	orderQty: string
}

class AddOrderScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.props.navigation.setOptions({ headerShown: false, cardStyle: { backgroundColor: 'rgba(0,0,0,0.8)', opacity: 1 } })

		this.state = {
			vendor: this.props.vendors.venders.length > 0 ? this.props.vendors.venders[0] : undefined,
			orderQty: this.props.selectedMaster.OrderQty.toString(),
		}

		this.onAddBtnPressed = this.onAddBtnPressed.bind(this)
	}

	componentDidMount() {
		this.props.loadVendors()
	}

	onOrderQuantityChanged = (value: string) => {
		if (value === "") {
			this.setState({ orderQty: "0" })
			return
		}

		let quantity = parseInt(value).toString()
		const totalQuantity = this.props.selectedMaster.OrderQty
		if (parseInt(value) > totalQuantity) {
			quantity = totalQuantity.toString()
		}

		this.setState({ orderQty: quantity })
	}

	onAddBtnPressed() {
		let orderId = 0
		this.props.orders.orders.map((order: Order, index: number) => {
			if (order.Id > orderId) {
				orderId = order.Id
			}
		})
		orderId = orderId + 1

		const orderQuantity = parseInt(this.state.orderQty)
		if (orderQuantity <= 0) {
			alert("Order Quantity must be 1 at least or greater.")
			return
		}

		const currentUser = firebase.auth().currentUser
		const order: Order = new Order({
			Id: orderId,
			VendorId: this.props.selectedMaster.VendorId,
			ItemNumber: this.props.selectedMaster.ItemNumber,
			Description: this.props.selectedMaster.Description,
			CreatedBy: currentUser?.email,
			OrderQty: orderQuantity
		})

		this.props.addOrder(order)
		this.props.navigation.goBack()
	}

	render() {
		const vendorPickerData: any[] = []
		this.props.vendors.venders.map((vender: Vendor, index: number) => {
			vendorPickerData.push({ label: vender.Name, value: vender.Name })
		})
		const selectedVendorPickerValue = (this.state.vendor) ? this.state.vendor.Name : ""
		return (
			<View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
				<View style={styles.container}>
					<Text style={styles.title}>Add Order</Text>
					<View style={styles.subContainer}>
						<Text style={styles.subTitle} numberOfLines={1}>Vendor ID:</Text>
						<Text style={styles.subText} numberOfLines={1}>{this.props.selectedMaster.VendorId}</Text>
					</View>
					<View style={styles.subContainer}>
						<Text style={styles.subTitle} numberOfLines={1}>Item Number:</Text>
						<Text style={styles.subTitle} numberOfLines={1}>{this.props.selectedMaster.ItemNumber}</Text>
					</View>
					<View style={styles.subContainer}>
						<Text style={styles.subTitle} numberOfLines={1}>Description:</Text>
						<Text style={styles.subTitle} numberOfLines={1}>{this.props.selectedMaster.Description}</Text>
					</View>
					<View style={styles.subContainer}>
						<Text style={styles.subTitle} numberOfLines={1}>Total Quantity:</Text>
						<Text style={styles.subTitle} numberOfLines={1}>{this.props.selectedMaster.OrderQty}</Text>
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
						<Button raised primary style={styles.add} text="Add" onPress={this.onAddBtnPressed} />
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
		vendors: state.vendors,
		user: state.user,
		orders: state.orders,
		selectedMaster: state.masters.selectedMaster
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		loadVendors: () => { dispatch({ type: VendorActionTypes.LOAD }) },
		addOrder: (order: Order) => dispatch({ type: OrderActionType.ADD_ORDER, order: order })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrderScreen);