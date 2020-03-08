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
	description: string
}

class AddOrderScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.props.navigation.setOptions({ headerShown: false, cardStyle: { backgroundColor: 'rgba(0,0,0,0.8)', opacity: 1 } })

		this.state = {
			vendor: this.props.vendors.venders.length > 0 ? this.props.vendors.venders[0] : undefined,
			description: "",
		}

		this.onAddBtnPressed = this.onAddBtnPressed.bind(this)
	}

	componentDidMount() {
		this.props.loadVendors()
	}

	onAddBtnPressed() {
		let orderId = 0
		this.props.orders.orders.map((order: Order, index: number) => {
			if (order.Id > orderId) {
				orderId = order.Id
			}
		})
		orderId = orderId + 1

		const vendor = this.state.vendor
		const description = this.state.description
		const currentUser = firebase.auth().currentUser
		if (vendor && description) {
			const order: Order = new Order({ Id: orderId, VendorId: vendor.Id, ItemNumber: this.props.selectedMaster.ItemNumber, Description: description, CreatedBy: currentUser.email })
			this.props.addOrder(order)
			this.props.navigation.goBack()
		}
	}

	render() {
		const vendorPickerData: any[] = []
		this.props.vendors.venders.map((vender: Vendor, index: number) => {
			vendorPickerData.push({ label: vender.Name, value: vender.Name })
		})
		const selectedVendorPickerValue = (this.state.vendor) ? this.state.vendor.Name : ""
		return (
			<View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
				<View style={styles.container}>
					<Text style={styles.title}>Add Order</Text>
					<View style={styles.vendorContainer}>
						<Text style={styles.vendorTitle}>Vendor:</Text>
						<RNPickerSelect
							placeholder={{ label: 'Select a vendor...', value: null, color: '#000000', }}
							items={vendorPickerData}
							onValueChange={(value, index) => {
								this.props.vendors.venders.map((item, i) => {
									const vendor = this.props.vendors.venders[i]
									if (value == vendor.Name) {
										this.setState({ vendor: vendor })
									}
								})
							}}
							style={{ ...pickerSelectStyles, }}
							value={selectedVendorPickerValue}
							useNativeAndroidPickerStyle={false}
							textInputProps={{ underlineColor: 'yellow' }}
						/>
					</View>
					<View style={styles.descriptionContainer}>
						<Text style={styles.descriptionTitle}>Description:</Text>
						<TextInput
							style={styles.descriptionText}
							placeholder="Description here..."
							placeholderTextColor='gray'
							value={this.state.description}
							onChangeText={text => {
								this.setState({ description: text });
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
		left: 10,
		right: 10,
		padding: 10,
		height: 290,
		flexDirection: "column",
		alignSelf: "center",
		backgroundColor: 'rgba(255,255,255,1)'
	},
	title: {
		color: 'rgba(0,0,0,1)',
		fontSize: 30,
		textAlign: "center",
	},
	vendorContainer: {
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "center",
	},
	vendorTitle: {
		padding: 10,
		color: 'rgba(0,0,0,1)',
		fontSize: 20,
	},
	itemNumberContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},
	itemNumberTitle: {
		padding: 10,
		color: 'rgba(0,0,0,1)',
		fontSize: 20,
	},
	itemNumberText: {
		padding: 10,
		color: 'rgba(0,0,0,1)',
		fontSize: 20,
	},
	descriptionContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},
	descriptionTitle: {
		padding: 10,
		color: 'rgba(0,0,0,1)',
		fontSize: 20,
	},
	descriptionText: {
		padding: 10,
		color: 'rgba(0,0,0,1)',
		fontSize: 20,
	},
	buttonContainer: {
		marginTop: 20,
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	cancel: {
		marginLeft: 20,
	},
	add: {
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