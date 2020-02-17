import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
} from 'react-native'
import { ListItem, ThemeContext } from 'react-native-material-ui'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Master from '../engine/master'

function MasterListItem(master) {
	return (
		<View>

		</View>

	);
}

class MasterListScreen extends Component {
	static navigationOptions = {
		headerShown: true,
	}
	constructor(props) {
		super(props)
		this.state = {
			masters: this.props.masters
		}
	}

	render() {
		return (
			<View>
				<Text>MasterListScreen < /Text>
			< FlatList
						data={this.state.masters}
						renderItem={({ item }) => {
							return (
								<ListItem divider centerElement={item.venderId} />
							);
						}
						}
					/>
					< /View>
						);
					}
				}
				
const mapStateToProps = state => {
	return {
						masters: state.masters,
				};
			};
			
const mapDispatchToProps = dispatch => {
	return {

					};
				};
				
export default connect(mapStateToProps, mapDispatchToProps)(MasterListScreen);