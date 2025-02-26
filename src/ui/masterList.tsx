const React = require('react')
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
import { SearchBar } from 'react-native-elements'
const { ListItem, ThemeContext, Divider } = require('react-native-material-ui')
import { StackNavigationProp } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/FontAwesome'

import { MainStackParamList } from '.'
import Master, {
	MasterSortType,
	sort as sortMasters,
	State as MasterState,
	Action as MasterAction,
	ActionTypes as MasterActionTypes,
} from '../engine/master'

type NavigationProps = StackNavigationProp<MainStackParamList, "MasterList">
type Props = {
	navigation: NavigationProps
	masters: MasterState
}

type State = {
	masters: Master[]
	sortType: number
	search: string
}

class MasterListScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.props.navigation.setOptions({ headerShown: true, title: "Masters" })

		this.state = {
			masters: this.props.masters.masters,
			sortType: MasterSortType.VendorAscending,
			search: ""
		}
	}

	onMasterListItemPressed = (item: Master) => {
		this.props.selectMaster(item)
		this.props.navigation.navigate("AddOrder")
	}

	sort = (type: number) => {
		this.setState({ sortType: type })
	}

	onSearchKeyChanged = (search: string) => {
		this.search(search);
	};

	search(search: string) {
		const searchResult = this.props.masters.masters.filter(function (master: Master) {
			const venderId = master.VendorId.toString()
			const itemNumber = master.ItemNumber
			const description = master.Description

			if (venderId.indexOf(search) !== -1) { return true }
			if (itemNumber.indexOf(search) !== -1) { return true }
			if (description.indexOf(search) !== -1) { return true }

			return false
		});

		this.setState({
			masters: searchResult,
			search: search
		});
	}

	render() {
		const sortIconName = (this.state.sortType == MasterSortType.VendorAscending
			|| this.state.sortType == MasterSortType.ItemNumberAscending
			|| this.state.sortType == MasterSortType.DescriptionAscending
			|| this.state.sortType == MasterSortType.OrderQtyAscending) ? "caret-down" : "caret-up"
		const masterList = sortMasters(this.state.masters, this.state.sortType)

		return (
			<View>
				{this.props.masters.isLoading && <ActivityIndicator />}
				<SearchBar
					inputContainerStyle={{ backgroundColor: 'white' }}
					containerStyle={{ backgroundColor: 'white' }}
					placeholder="Search Products..."
					onChangeText={this.onSearchKeyChanged}
					value={this.state.search}
				/>
				<View style={masterListHeaderStyle.container}>
					<TouchableOpacity style={masterListHeaderStyle.venderContainer} onPress={() => { this.sort((this.state.sortType == MasterSortType.VendorAscending) ? MasterSortType.VendorDescending : MasterSortType.VendorAscending) }}>
						<View style={{ flex: 1, flexDirection: "row", }}>
							<Text style={masterListHeaderStyle.vender}>VENDER</Text>
							{
								(this.state.sortType == MasterSortType.VendorAscending || this.state.sortType == MasterSortType.VendorDescending) && <Icon name={sortIconName} style={masterListHeaderStyle.vendorArrow} />
							}
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={masterListHeaderStyle.itemContainer} onPress={() => { this.sort((this.state.sortType == MasterSortType.ItemNumberAscending) ? MasterSortType.ItemNumberDescending : MasterSortType.ItemNumberAscending) }}>
						<View style={{ flex: 1, flexDirection: "row", }}>
							<Text style={masterListHeaderStyle.vender}>ITEM#</Text>
							{
								(this.state.sortType == MasterSortType.ItemNumberAscending || this.state.sortType == MasterSortType.ItemNumberDescending) && <Icon name={sortIconName} style={masterListHeaderStyle.itemArrow} />
							}
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={masterListHeaderStyle.descriptionContainer} onPress={() => { this.sort((this.state.sortType == MasterSortType.DescriptionAscending) ? MasterSortType.DescriptionDescending : MasterSortType.DescriptionAscending) }}>
						<View style={{ flex: 1, flexDirection: "row", }}>
							<Text style={masterListHeaderStyle.vender}>DESCRIPTION</Text>
							{
								(this.state.sortType == MasterSortType.DescriptionAscending || this.state.sortType == MasterSortType.DescriptionDescending) && <Icon name={sortIconName} style={masterListHeaderStyle.descriptionArrow} />
							}
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={masterListHeaderStyle.orderQuantityContainer} onPress={() => { this.sort((this.state.sortType == MasterSortType.OrderQtyAscending) ? MasterSortType.OrderQtyDescending : MasterSortType.OrderQtyAscending) }}>
						<View style={{ flex: 1, flexDirection: "row", }}>
							<Text style={masterListHeaderStyle.vender}>ORDER QTY</Text>
							{
								(this.state.sortType == MasterSortType.OrderQtyAscending || this.state.sortType == MasterSortType.OrderQtyDescending) && <Icon name={sortIconName} style={masterListHeaderStyle.orderQuantityArrow} />
							}
						</View>
					</TouchableOpacity>
				</View>
				<FlatList
					data={masterList}
					renderItem={({ item }) =>
						<TouchableOpacity onPress={() => { this.onMasterListItemPressed(item) }}>
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
			</View>
		);
	}
}

const masterListHeaderStyle = StyleSheet.create({
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
		marginLeft: 10,
	},
	descriptionContainer: {
		flex: 9,
		flexDirection: "row",
		marginLeft: 10,
	},
	orderQuantityContainer: {
		flex: 3,
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	vender: {
		textAlign: "left",
		alignSelf: "baseline",
		fontSize: 10,
	},
	item: {
		textAlign: "left",
		alignSelf: "baseline",
		fontSize: 10,
	},
	description: {
		alignSelf: "baseline",
		textAlign: "left",
		fontSize: 10,
	},
	orderQuantity: {
		alignSelf: "baseline",
		textAlign: "right",
		fontSize: 10,
	},
	vendorArrow: {
		paddingLeft: 5,
	},
	itemArrow: {
		paddingLeft: 5,
	},
	descriptionArrow: {
		paddingLeft: 5,
	},
	orderQuantityArrow: {
		paddingLeft: 5,
	}
})

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
		marginLeft: 10,
	},
	description: {
		flex: 9,
		alignSelf: "center",
		textAlign: "left",
		fontSize: 10,
		marginLeft: 10,
	},
	orderQuantity: {
		flex: 3,
		alignSelf: "center",
		textAlign: "right",
		fontSize: 10,
	}
})

const mapStateToProps = (state: { masters: MasterState; }) => {
	return {
		masters: state.masters,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		loadMaster: () => { dispatch({ type: MasterActionTypes.LOAD }) },
		selectMaster: (master: Master) => { dispatch({ type: MasterActionTypes.SELECT_MASTER, master: master }) }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterListScreen);