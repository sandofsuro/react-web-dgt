/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, TextInput, Dimensions, Image, Alert, Platform, Navigator, ListView, RefreshControl } from 'react-native';

export default class Rank extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            refreshing: false,
            dataSource: ds.cloneWithRows([]),
        };
    }
    
    componentWillMount() {
        client.checkScoreRank(function(result) {
            if(result.success == true) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(result.data),
                });
            } else {
                console.log(err);
            }
        }.bind(this));
    }
    
    _onRefresh() {
        this.setState({refreshing: true});
        client.checkScoreRank(function(result) {
            if(result.success == true) {
                this.setState({
                    refreshing: false,
                    dataSource: this.state.dataSource.cloneWithRows(result.data),
                });
            } else {
                console.log(err);
            }
        }.bind(this));
    }
    
    renderRow(rowData, section, i) {
        var serial = parseInt(i)+1;
        return (
            <TouchableHighlight underlayColor={'transparent'} onPress={() => {}}>
                <View style={styles.row}>
                    <View style={styles.rowView}>
                        <Text style={styles.serialText}>{serial}</Text>
                        <Image source={{uri: rowData.avatar_url}} style={{width:40,height:40,borderRadius:20}} />
                        <Text style={styles.titleText} numberOfLines={1}>{rowData.name}</Text>
                    </View>
                    <View style={styles.markView}>
                        <Text style={styles.markText}>{rowData.score}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    
    renderScene(route, navigator) {
		return (
			<View style={styles.container}>
                <View style={styles.topContainer}>
                    <Image source={require('../img/rank/bg_phb@2x.png')} resizeMode='stretch' style={{width:Dimensions.get('window').width, flex:1}}/>
                    <View style={styles.info_container}>
                        <Image source={{uri: client.userInfo.userAvatar}} style={{width:70.5,height:70,borderRadius:35}}/>
                        <Text style={{color:'white',fontSize:20,marginTop: 5, marginBottom: 3, backgroundColor:'transparent'}}>{client.userInfo.userLoginName}</Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
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
            </View>
		);
	}
    
    renderNavTitle(route, navigator) {
		return (
			<Text style={styles.navBarTitleText}>
			    积分排行榜
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
				initialRoute={{title:'积分排行榜'}}
			/>
		);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:Platform.OS == 'ios' ? 64 : 56,
        backgroundColor: 'white',
        justifyContent: 'center',
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
	topContainer: {
	    flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
	},
	bottomContainer: {
	    flex: 2.5,
        alignItems: 'center',
        backgroundColor: '#ffffff',
	},
	info_container: {
        zIndex: 1,
        position:'absolute',
        top: Dimensions.get('window').height / 35,
        left: Dimensions.get('window').width / 2 - 35,
        justifyContent: 'center',
        alignItems: 'center',
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
    markView: {
        flex: 0.3,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingRight: 20,
    },
    serialText: {
        color: 'black',
        fontSize: 36 / 2,
        marginRight: 10,
    },
    titleText: {
        color: '#666666',
        fontSize: 36 / 2,
        marginLeft: 10,
    },
    markText: {
        color: '#ff5559',
        fontSize: 36 / 2,
    },
});