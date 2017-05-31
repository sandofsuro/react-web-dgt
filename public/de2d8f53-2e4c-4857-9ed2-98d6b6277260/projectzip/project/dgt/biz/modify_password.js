/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, TextInput, Dimensions, Image, Alert, Platform, Navigator, ListView} from 'react-native';

var time = null;

export default class ModifyPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPwd: '',
            newPwd: '',
            checknewPwd: '',
            verifyCode: '',
            count: '',
            verifyButtonBackgroundColor: '#ff5558',
        };
    }
    
    componentWillMount() {
        
    }
    
    save() {
        if(this.state.oldPwd == '' || this.state.newPwd == '' || this.state.checknewPwd == '') {
            Alert.alert('', '信息不完整！', [{text:'确定'}]);
        } else if(this.state.newPwd != this.state.checknewPwd) {
            Alert.alert('', '两次密码输入不一致！', [{text:'确定'}]);
        } else if(this.state.verifyCode == "") {
            Alert.alert('', '请输入验证码！', [{text:'确定'}]);
        } else {
            client.modifyPassword(client.userInfo.userId, this.state.oldPwd, this.state.newPwd, function(result) {
                if(result.success == true) {
                    Alert.alert("", "保存成功", [{text:'确定'}]);
                } else {
                    Alert.alert("", result.err, [{text:'确定'}]);
                }
            }.bind(this));
        }
    }
    
    getVerifyCode() {
        if(this.state.count != '') {
            Alert.alert('', '请稍后再获取！', [{text:'确定'}]);
            return;
        }
        var num = 60;
        this.setState({verifyButtonBackgroundColor: '#cecece', count: '('+num.toString()+')'});
        time = setInterval(function() {
            this.setState({count: '('+(--num).toString()+')'});
            if(num == 0) {
                clearInterval(time);
                this.setState({verifyButtonBackgroundColor: '#ff5558', count: ''});
            }
        }.bind(this),1000);
    }
    
    renderScene(route, navigator) {
		return (
			<View style={styles.container}>
			    <View style={styles.bottomContainer}>
			        <View style={styles.textInput}>
    			        <TextInput style={styles.name} placeholder="请输入原密码" placeholderTextColor="#ccc" underlineColorAndroid="transparent" secureTextEntry={true} onChangeText={(text) => this.setState({oldPwd: text})} value={this.state.oldPwd} />
			        </View>
			        <View style={styles.textInput}>
    			        <TextInput style={styles.name} placeholder="请输入新密码" placeholderTextColor="#ccc" underlineColorAndroid="transparent" secureTextEntry={true} onChangeText={(text) => this.setState({newPwd: text})} value={this.state.newPwd} />
			        </View>
			        <View style={styles.textInput}>
    			        <TextInput style={styles.name} placeholder="请确认新密码" placeholderTextColor="#ccc" underlineColorAndroid="transparent" secureTextEntry={true} onChangeText={(text) => this.setState({checknewPwd: text})} value={this.state.checknewPwd} />
			        </View>
			        <View style={styles.verifyView}>
			            <View style={styles.verifyTextInput}>
			                <TextInput style={styles.verifyText} placeholder="请输入验证码" placeholderTextColor="#ccc" underlineColorAndroid="transparent" onChangeText={(text) => this.setState({verifyCode: text})} value={this.state.verifyCode} />
			            </View>
			            <TouchableHighlight style={[styles.verifyButton,{backgroundColor:this.state.verifyButtonBackgroundColor}]} underlayColor='#cecece' onPress={()=>{this.getVerifyCode();}}>
			                <Text style={styles.verifyButtonText}>{'获取验证码'+this.state.count}</Text>
                        </TouchableHighlight>
			        </View>
			        <View style={styles.buttonContainer}>
    			        <TouchableHighlight style={styles.button} underlayColor='#cecece' onPress={()=>{this.save();}}>
                          <Text style={styles.buttonText}>保 存</Text>
                        </TouchableHighlight>
                    </View>
			    </View>
            </View>
		);
	}
    
    renderNavTitle(route, navigator) {
		return (
			<Text style={styles.navBarTitleText}>
			    修改密码
			</Text>
		);
	}
	
	renderNavLeftButton(route, navigator) {
	    var title = "返回";
	    
		return (
			<TouchableOpacity
				onPress={() => {clearInterval(time);this.setState({verifyButtonBackgroundColor: '#ff5558', count: ''});this.props.navigator.pop();}}
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
				initialRoute={{title:'修改密码'}}
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
	bottomContainer: {
	    justifyContent: 'flex-start',
	    alignItems: 'center',
	    backgroundColor: '#ffffff',
	    height: Dimensions.get('window').height,
	    width: Dimensions.get('window').width,
	},
	buttonContainer: {
	    marginTop: 20,
	},
	button: {
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#ff5558',
	    height: Dimensions.get('window').height * 80 / 1334,
	    width: Dimensions.get('window').width * 680 / 750,
	    borderRadius: 5,
	},
	buttonText: {
	    color: '#fff',
	    fontSize: 36 / 2,
	},
	name: {
	    fontSize: 30 / 2,
	    height: Dimensions.get('window').height * 90 / 1334,
	    width: Dimensions.get('window').width * 680 / 750,
	},
	textInput: {
	    paddingLeft: 10,
	    justifyContent: 'center',
	    alignItems: 'center',
	    height: Dimensions.get('window').height * 90 / 1334,
	    width: Dimensions.get('window').width * 680 / 750,
	    borderColor: '#ccc',
	    borderWidth: 1 / 2,
	    borderStyle: 'solid',
	    borderRadius: 5,
	    marginTop: 20,
	},
	verifyView: {
	    flexDirection: 'row',
	    justifyContent: 'space-between',
	    alignItems: 'center',
	    height: Dimensions.get('window').height * 90 / 1334,
	    width: Dimensions.get('window').width * 680 / 750,
	    marginTop: 20,
	},
	verifyTextInput: {
	    paddingLeft: 10,
	    height: Dimensions.get('window').height * 90 / 1334,
	    width: Dimensions.get('window').width * 360 / 750,
	    borderColor: '#ccc',
	    borderWidth: 1 / 2,
	    borderStyle: 'solid',
	    borderRadius: 5,
	},
	verifyText: {
	    fontSize: 30 / 2,
	    height: Dimensions.get('window').height * 90 / 1334,
	    width: Dimensions.get('window').width * 360 / 750,
	},
	verifyButton: {
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#ff5558',
	    height: Dimensions.get('window').height * 90 / 1334,
	    width: Dimensions.get('window').width * 300 / 750,
	    borderRadius: 5,
	},
	verifyButtonText: {
	    color: '#fff',
	    fontSize: 32 / 2,
	}
});