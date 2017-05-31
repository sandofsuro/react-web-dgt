/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, TextInput, Dimensions, Image, Alert, Platform, Navigator, ListView, ScrollView } from 'react-native';

export default class Rule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    componentWillMount() {
        
    }
    
    renderScene(route, navigator) {
		return (
			<View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>签到规则</Text>
                </View>
                <View style={styles.divideLine}></View>
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.contentText}>1、默认每日签到10积分，奖励日期按奖励积分计算。</Text>
                    <Text style={styles.contentText}>2、完成新用户首次签到，一次性奖励50积分。（首次签到指从未进行过签到操作的用户进行的第一次签到）</Text>
                    <Text style={styles.contentText}>3、连续签到您将获得更多奖励积分，奖励规则如下：</Text>
                    <Text style={styles.contentText}>连续4日，奖励50分</Text>
                    <Text style={styles.contentText}>连续10日，奖励100分</Text>
                    <Text style={styles.contentText}>连续20日，奖励200分</Text>
                    <Text style={styles.contentText}>连续30日，奖励300分</Text>
                    <Text style={styles.contentText}>连续40日，奖励300分</Text>
                    <Text style={styles.contentText}>以此类推，连续30日后，每连续完成签到10日，皆奖励300分。</Text>
                    <Text style={styles.contentText}>任何漏签情况，都将导致您的连续签到累计清零，您需要重新进行连续签到以获得奖励。</Text>
                    <Text style={styles.contentText}>4、您可使用您的积分在积分商城兑换礼品。（积分商城将于近期上线）</Text>
                    <Text style={styles.contentText}>5、北京东管头投资管理公司拥有签到活动规则的最终解释权。</Text>
                </ScrollView>
            </View>
		);
	}
    
    renderNavTitle(route, navigator) {
		return (
			<Text style={styles.navBarTitleText}>
			    签到规则
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
				initialRoute={{title:'签到规则'}}
			/>
		);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:Platform.OS == 'ios' ? 74 : 68,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
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
	divideLine: {
	    height:0.5,
	    width: Dimensions.get('window').width - 20,
	    borderWidth: 0.5,
	    borderColor: '#cccccc',
	    borderStyle: 'solid',
	},
	title: {
	    width: Dimensions.get('window').width,
	    marginLeft: 20,
	    marginTop: 10,
	    marginBottom: 5,
	},
	titleText: {
	    fontSize: 36 / 2,
	    color: '#999999',
	},
	content: {
	    alignItems: 'flex-start',
	    marginTop: 10,
	    marginLeft: 20,
	    marginRight: 20,
	},
	contentText: {
	    fontSize: 30 / 2,
	    color: '#999999',
	    marginBottom: 10,
	}
});