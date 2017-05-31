/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, TextInput, Dimensions, Image, Alert, Platform, Navigator, ListView, RefreshControl} from 'react-native';
import QuizContent from './quiz_content';

export default class Quiz extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            refreshing: false,
            dataSource: ds.cloneWithRows([]),
        };
    }
    
    componentWillMount() {
        client.quiz(client.userInfo.userId, function(result) {
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
        client.quiz(client.userInfo.userId, function(result) {
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
    
    openQuiz(id, url, commited) {
        if(commited) {
            Alert.alert('', '该问卷调查已提交！', [{text:'确定'}]);
        } else {
            this.props.navigator.push({
                component: QuizContent,
                name: 'QuizContent',
                id: id,
                url: url,
                callback: function() {
                    client.quiz(client.userInfo.userId, function(result) {
                        if(result.success == true) {
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(result.data),
                            });
                        } else {
                            console.log(err);
                        }
                    }.bind(this));
                }.bind(this),
            });
        }
    }
    
    renderRow(rowData) {
        return (
            <TouchableHighlight underlayColor={'#ccc'} onPress={() => {this.openQuiz(rowData._id, rowData.url, rowData.commited)}}>
                <View style={styles.row}>
                    <Text style={styles.nameText} numberOfLines={1}>{rowData.title}</Text>
                    <Text style={styles.scoreText}>{rowData.commited == false ? rowData.score+'积分' : '已提交'}</Text>
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
			    问卷调查
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
				initialRoute={{title:'问卷调查'}}
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
	    flexDirection: 'row',
        height: 60,
        width: Dimensions.get('window').width,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
    },
    nameText: {
        width: Dimensions.get('window').width * 2 / 3,
        color: 'black',
        fontSize: 36 / 2,
        marginLeft: 20,
    },
    scoreText: {
        color: '#fd882a',
        fontSize: 36 / 2,
        marginRight: 20,
    }
});