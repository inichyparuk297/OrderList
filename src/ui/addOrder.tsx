import React, { Component } from 'react'
import {
	View,
	Text,
	TextInput,
	StyleSheet,
} from 'react-native'
const { connect } = require('react-redux')
import { Dispatch } from 'redux'
import { StackNavigationProp } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/FontAwesome'
const { Button } = require('react-native-material-ui')
import RNPickerSelect from 'react-native-picker-select';

import { MainStackParamList } from '.'
import Vendor, {
	State as VendorState,
	ActionTypes as VendorActionTypes
} from '../engine/vendor'
import Order, { ActionType as OrderActionType } from '../engine/order'

type NavigationProps = StackNavigationProp<MainStackParamList, "AddOrder">
type Props = {
	navigation: NavigationProps
	vendors: VendorState
	addOrder: any
	loadVendors: any
}

type State = {
	vendor?: Vendor
	itemNumber: string
	description: string
}

class AddOrderScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.props.navigation.setOptions({ headerShown: false, cardStyle: { backgroundColor: 'rgba(0,0,0,0.8)', opacity: 1 } })

		this.state = {
			vendor: this.props.vendors.venders.length > 0 ? this.props.vendors.venders[0] : undefined,
			itemNumber: "",
			description: "",
		}

		this.onAddBtnPressed = this.onAddBtnPressed.bind(this)
	}

	componentDidMount() {
		this.props.loadVendors()
	}

	onAddBtnPressed() {
		const vendor = this.state.vendor
		const itemNumber = this.state.itemNumber
		const description = this.state.description
		if (vendor && itemNumber && description) {
			const order = new Order({ VendorId: vendor.Id, ItemNumber: itemNumber, Description: description, CreatedBy: vendor.Name, CreatedOn: new Date() })
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
					<View style={styles.itemNumberContainer}>
						<Text style={styles.itemNumberTitle}>Item Number:</Text>
						<TextInput
							style={styles.itemNumberText}
							placeholder="Item Number here..."
							placeholderTextColor='gray'
							value={this.state.itemNumber}
							onChangeText={text => {
								this.setState({ itemNumber: text });
							}}
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

const mapStateToProps = (state: { vendors: VendorState; }) => {
	return {
		vendors: state.vendors,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		loadVendors: () => { dispatch({ type: VendorActionTypes.LOAD }) },
		addOrder: (order: Order) => dispatch({ type: OrderActionType.ADD_ORDER, order: order })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrderScreen);