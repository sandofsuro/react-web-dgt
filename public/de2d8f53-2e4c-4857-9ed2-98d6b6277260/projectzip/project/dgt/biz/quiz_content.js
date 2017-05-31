/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, TextInput, Dimensions, Image, Alert, Platform, Navigator, ListView, WebView } from 'react-native';

export default class QuizContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    componentWillMount() {
        
    }
    
    finish() {
        client.commitQuiz(client.userInfo.userId, this.props.route.id, function(result) {
            if(result.success == true) {
                this.props.route.callback();
                Alert.alert('', '提交成功！', [{text:'确定', onPress: () => this.props.navigator.pop()}]);
            } else {
                console.log(result.err);
            }
        }.bind(this));
    }
    
    renderScene(route, navigator) {
		return <WebView
            injectedJavaScript="var iListener=setInterval(function(){if ($('#end_desc').html().indexOf('完成')!=-1){clearInterval(iListener);location.href='https://www.wenjuan.net/';}},10);"
            automaticallyAdjustContentInsets={false}
            style={styles.container}
            source={{uri: this.props.route.url}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            onLoadStart={(event)=>{if(event.nativeEvent.url == "https://www.wenjuan.net/"){this.finish();}}}
            // onShouldStartLoadWithRequest={(info)=>{if(info.url.indexOf('empty')!=-1){this.finish();return false;}return true;}}
            startInLoadingState={true}
        />
	}
    
    renderNavTitle(route, navigator) {
		return (
			<Text style={styles.navBarTitleText}>
			    问卷内容
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
				initialRoute={{title:'问卷内容'}}
			/>
		);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:Platform.OS == 'ios' ? 64 : 56,
        backgroundColor: 'white',
        justifyContent: 'center',
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
});