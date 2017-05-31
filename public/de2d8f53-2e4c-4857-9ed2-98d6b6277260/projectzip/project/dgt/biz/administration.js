/**
* asd
* @author asd
* Thu Dec 29 16:33:24 CST 2016
*/
'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, TextInput, Dimensions, Image, Alert, Platform, Navigator, ListView, RefreshControl } from 'react-native';

import News from '../components/news';

export default class ADMIN extends Component{
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            refreshing: false,
            dataSource: ds.cloneWithRows([]),
        };
    }
    
    componentWillMount() {
        client.getArticles('company', function(responseData) {
            if(responseData.success == true) {
                var company = [];
                for(var i=0;i<responseData.data.length;i++) {
                    if(responseData.data[i].topic == "company") {
                        company.push(responseData.data[i]);
                    }
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(company),
                });
            } else {
                console.warn(responseData.err);
            }
        }.bind(this));
    }
    
    _onRefresh() {
        this.setState({refreshing: true});
        client.getArticles('company', function(responseData) {
            if(responseData.success == true) {
                var company = [];
                for(var i=0;i<responseData.data.length;i++) {
                    if(responseData.data[i].topic == "company") {
                        company.push(responseData.data[i]);
                    }
                }
                this.setState({
                    refreshing: false,
                    dataSource: this.state.dataSource.cloneWithRows(company),
                });
            } else {
                console.warn(responseData.err);
            }
        }.bind(this));
    }
  
    openContent(data) {
       this.props.navigator.push({
           component: News,
           name:'',
           title:data.title,
           url:data.url,
       });
    }
    
    renderRow(rowData) {
        return (
            <TouchableHighlight underlayColor={'#ccc'} onPress={() => {this.openContent(rowData);}}>
                <View style={styles.row}>
                    <Text style={styles.rowText} numberOfLines={1}>{rowData.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
             <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={{marginTop:20, fontSize: 26, color: 'white'}}>公司行政</Text>
                </View>  
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#f5f5f5',
    },
    titleContainer:{
        height:80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#ff5658',
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
	    flex: 1,
	    marginTop: 10,
    },
    row: {
        height: 50,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        paddingLeft: 5,
        paddingRight: 5,
    },
    rowText: {
        color: '#333',
        fontSize: 36 / 2,
    }
});