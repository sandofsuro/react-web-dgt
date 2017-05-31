/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, TextInput, Dimensions, Image, Alert, Platform, Navigator, ListView } from 'react-native';

export default class Prize extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
    }
    
    componentWillMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows([{'name':'一篮鸡蛋','type':'首次签到奖品','image':'https://beecode-usercenter.oss-cn-beijing.aliyuncs.com/570cb76707784c8800ed1de3','isReceive':true, 'date':'2017/02/10'},{'name':'大王酱油','type':'首次签到奖品','image':'https://beecode-usercenter.oss-cn-beijing.aliyuncs.com/570cb76707784c8800ed1de3','isReceive':false},{'name':'蓝月亮洗衣液','type':'首次签到奖品','image':'https://beecode-usercenter.oss-cn-beijing.aliyuncs.com/570cb76707784c8800ed1de3','isReceive':false}]),
        });
    }
    
    renderRow(rowData) {
        return (
            <TouchableHighlight underlayColor={'transparent'} onPress={() => {}}>
                <View style={styles.row}>
                    <View style={styles.rowView}>
                        <Image source={{uri: rowData.image}} style={{width:40,height:40,borderRadius:20}} />
                        <View style={styles.textView}>
                            <Text style={styles.nameText} numberOfLines={1}>{rowData.name}</Text>
                            <Text style={styles.typeText} numberOfLines={1}>{rowData.type}</Text>
                        </View>
                    </View>
                    <View style={styles.dateView}>
                        <Image source={{uri: GLOBAL.WebRoot + 'web/img/home/tips@2x.png'}} style={{width:77,height:20}}/>
                        <Text style={styles.dateText}>{rowData.date}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    
    renderScene(route, navigator) {
		return (
			<View style={styles.container}>
			    <ListView
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
			    奖品列表
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
				initialRoute={{title:'奖品列表'}}
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
    textView: {
        marginLeft: 20,
    },
    dateView: {
        flex: 0.5,
        height: 60,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
        paddingRight: 20,
    },
    nameText: {
        color: 'black',
        fontSize: 36 / 2,
    },
    typeText: {
        color: '#666666',
        fontSize: 30 / 2,
        marginTop: 5,
    },
    dateText: {
        color: '#666666',
        fontSize: 30 / 2,
        marginTop: 5,
    },
});