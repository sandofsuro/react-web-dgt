/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, TextInput, Dimensions, Image, Alert, Platform, Navigator, ListView, RefreshControl } from 'react-native';
import AKCommunications from '../components/AKCommunications.js';

export default class PhoneList extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            refreshing: false,
            dataSource: ds.cloneWithRows([]),
        };
    }
    
    componentWillMount() {
        client.getContacts(function(result) {
            if(result.success == true) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(result.data),
                });
            } else {
                console.log(result.err);
            }
        }.bind(this));
    }
    
    _onRefresh() {
        this.setState({refreshing: true});
        client.getContacts(function(result) {
            if(result.success == true) {
                this.setState({
                    refreshing: false,
                    dataSource: this.state.dataSource.cloneWithRows(result.data),
                });
            } else {
                console.log(result.err);
            }
        }.bind(this));
    }
    
    dial(data) {
        AKCommunications.phonecall(data, true);
    }
    
    renderRow(rowData) {
        return (
            <TouchableHighlight underlayColor={'#ccc'} onPress={() => {this.dial(rowData.number);}}>
                <View style={styles.row}>
                    <Text style={styles.rowText} numberOfLines={1}>{rowData.name}</Text>
                    <Image source={{uri: GLOBAL.WebRoot + 'web/img/home/phone@2x.png'}} style={styles.iconImage} />
                </View>
            </TouchableHighlight>
        );
    }
    
    renderScene(route, navigator) {
		return (
			<View style={styles.container}>
                <ListView
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                      />
                    }
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    contentContainerStyle={styles.list}
                    enableEmptySections = {true}
                />
            </View>
		);
	}
    
    renderNavTitle(route, navigator) {
		return (
			<Text style={styles.navBarTitleText}>
			    电话黄页
			</Text>
		);
	}
	
	renderNavLeftButton(route, navigator) {
	    var title = "返回";
	    
		return (
			<TouchableOpacity
				onPress={() => this.props.navigator.pop()}
				style={styles.navBarLeftButton}>
				<Image source={{uri: GLOBAL.WebRoot + 'web/img/register/Arrow@2x.png'}} style={styles.backImage} />
				<Text style={styles.navBarButtonText}>
					{title}
				</Text>
			</TouchableOpacity>
		);
	}
	
	renderNavRightButton(route, navigator) {
		var title = "";
		
		return (
			<TouchableOpacity
				style={styles.navBarRightButton}>
				<Text style={styles.navBarButtonText}>
					{title}
				</Text>
			</TouchableOpacity>
		);
	}
    
    render() {
        var bar = (
			<Navigator.NavigationBar
				routeMapper={{
					LeftButton:this.renderNavLeftButton.bind(this),
					RightButton:this.renderNavRightButton.bind(this),
					Title:this.renderNavTitle.bind(this),
				}}
				style={styles.navBar}
			/>
		);
		return (
			<Navigator style={styles.navigator}
				navigationBar={bar}
				renderScene={this.renderScene.bind(this)}
				initialRoute={{title:'电话黄页'}}
			/>
		);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:Platform.OS == 'ios' ? 74 : 68,
        backgroundColor: '#f5f5f5',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    navigator: {
		flex:1,
		justifyContent: 'center',
		alignItems: 'stretch',
	},
	navBar: {
		backgroundColor: '#ff5558',
		justifyContent: 'center',
	},
	navBarTitleText: {
		fontSize:20,
		fontWeight: '400',
		marginVertical: 12,
		width: 3 * (Dimensions.get('window').width) / 5,
		textAlign: 'center',
		color: '#ffffff',
	},
	navBarButtonText: {
		fontSize:15,
		color: '#ffffff',
	},
	navBarLeftButton: {
	    flex: 1,
	    flexDirection: 'row',
		paddingLeft: 10,
		alignItems: 'center',
	},
	navBarRightButton: {
		paddingRight: 10,
		justifyContent: 'center',
	},
	backImage: {
	    width: 23 / 2,
	    height: 41 / 2,
	    marginRight: 5,
	},
	list: {
        
    },
    row: {
        height: 50,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        paddingLeft: 15,
        paddingRight: 15,
    },
    rowText: {
        color: '#333',
        fontSize: 36 / 2,
    },
    iconImage: {
        width: 28,
        height: 28,
    }
});