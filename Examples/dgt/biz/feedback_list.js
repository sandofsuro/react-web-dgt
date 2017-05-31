/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, TextInput, Dimensions, Image, Alert, Platform, Navigator, ListView, RefreshControl } from 'react-native';
import FeedBack from './feedback';
import FeedBackDetail from './feedback_detail';

export default class FeedBackList extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            refreshing: false,
            dataSource: ds.cloneWithRows([]),
        };
    }
    
    componentWillMount() {
        client.checkFeedBack(client.userInfo.userId, null, function(result) {
            if(result.success == true) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.sort(result.data)),
                });
            } else {
                console.log(result.err);
            }
        }.bind(this));
    }
    
    _onRefresh() {
        this.setState({refreshing: true});
        client.checkFeedBack(client.userInfo.userId, null, function(result) {
            if(result.success == true) {
                this.setState({
                    refreshing: false,
                    dataSource: this.state.dataSource.cloneWithRows(this.sort(result.data)),
                });
            } else {
                console.log(result.err);
            }
        }.bind(this));
    }
    
    openFeedBack(data) {
        this.props.navigator.push({
            component: FeedBackDetail,
            name: 'FeedBackDetail',
            data: data
        });
    }
    
    newFeedBack() {
        this.props.navigator.push({
            component: FeedBack,
            name: 'FeedBack',
            callback: function() {
                client.checkFeedBack(client.userInfo.userId, null, function(result) {
                    if(result.success == true) {
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(this.sort(result.data)),
                        });
                    } else {
                        console.log(result.err);
                    }
                }.bind(this));
            }.bind(this),
        });
    }
    
    sort(data) {
        var closed = [];
        for(var i=0;i<data.length;i++) {
            if(data[i].status == 'closed') {
                closed.push(data[i]);
                data.splice(i,1);
                i--;
            }
        }
        return data.concat(closed);
    }
    
    renderRow(rowData) {
        var state = '';
        if(rowData.status == 'committed') {
            state = '反映中';
        } else if(rowData.status == 'replied') {
            state = '已回复';
        } else if(rowData.status == 'closed') {
            state = '已关闭';
        }
        return (
            <TouchableHighlight underlayColor={'#ccc'} onPress={() => {this.openFeedBack(rowData)}}>
                <View style={styles.row}>
                    <View style={styles.rowView}>
                        <Text style={styles.nameText} numberOfLines={1}>{rowData.title}</Text>
                    </View>
                    <View style={styles.stateView}>
                        <Text style={[styles.stateText, {color: rowData.status == 'committed' ? '#fd882a' : (rowData.status == 'replied' ? '#029bd5' : '#999999')}]}>{state}</Text>
                        <Image source={require('../img/personal/Arrow@2x.png')} style={styles.arrow_image} />
                    </View>
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
			    反映情况
			</Text>
		);
	}
	
	renderNavLeftButton(route, navigator) {
	    var title = "返回";
	    
		return (
			<TouchableOpacity
				onPress={() => this.props.navigator.pop()}
				style={styles.navBarLeftButton}>
				<Image source={require('../img/register/Arrow@2x.png')} style={styles.backImage} />
				<Text style={styles.navBarButtonText}>
					{title}
				</Text>
			</TouchableOpacity>
		);
	}
	
	renderNavRightButton(route, navigator) {
		var title = "新建反映";
		
		return (
			<TouchableOpacity
			    onPress={() => this.newFeedBack()}
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
				initialRoute={{title:'反映情况'}}
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
	    flex: 1,
	    flexDirection: 'row',
		paddingRight: 10,
		alignItems: 'center',
	},
	backImage: {
	    width: 23 / 2,
	    height: 41 / 2,
	    marginRight: 5,
	},
	list: {
	    
	},
	row: {
	    flexDirection: 'row',
        height: 60,
        width: Dimensions.get('window').width,
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
    },
    rowView: {
        flex:1,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingLeft: 20,
    },
    stateView: {
        flex: 0.5,
        flexDirection: 'row',
        height: 60,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingRight: 10,
    },
    nameText: {
        width: Dimensions.get('window').width * 2 / 3,
        color: 'black',
        fontSize: 36 / 2,
    },
    stateText: {
        color: '#666666',
        fontSize: 30 / 2,
        marginRight: 10,
    },
    arrow_image: {
        height: 22,
        width: 12,
    }
});