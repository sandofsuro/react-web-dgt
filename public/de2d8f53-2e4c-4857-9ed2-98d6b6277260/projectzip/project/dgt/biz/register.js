/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, TextInput, Dimensions, Image, Alert, Platform, Navigator, KeyboardAvoidingView } from 'react-native';

var time = null;

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            behavior: 'padding',
            username: '',
            name: '',
            phone: '',
            idnumber: '',
            pwd: '',
            check_pwd: '',
            verifyCode: '',
            count: '',
            verifyButtonBackgroundColor: '#ff5558',
        };
    }
    
    componentWillMount() {
        
    }
    
    IdentityCodeValid(code) { 
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var tip = "";
        var pass= true;
        
        if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)$/i.test(code)){
            tip = "身份证号格式错误";
            pass = false;
        }
        
       else if(!city[code.substr(0,2)]){
            tip = "地址编码错误";
            pass = false;
        }
        else{
            //18位身份证需要验证最后一位校验位
            if(code.length == 18){
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                //校验位
                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++)
                {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if(parity[sum % 11] != code[17].toUpperCase()){
                    tip = "校验位错误";
                    pass =false;
                }
            }
        }
        if(!pass) Alert.alert(tip);
        return pass;
    }
    
    register() {
        if(this.state.username == '') {
            Alert.alert('','请输入用户名！', [{text:'确定'}]);
        } else if(this.state.name == '') {
            Alert.alert('','请输入真实姓名！', [{text:'确定'}]);
        } else {
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if(!myreg.test(this.state.phone)) {
                Alert.alert('','请输入有效的手机号码！', [{text:'确定'}]);
            } else if(!this.IdentityCodeValid(this.state.idnumber)) {
                return;
            } else if(this.state.pwd == '') {
                Alert.alert('','请输入密码！', [{text:'确定'}]);
            } else if(this.state.check_pwd == '') {
                Alert.alert('','请再次输入密码！', [{text:'确定'}]);
            } else if(this.state.pwd !== this.state.check_pwd) {
                Alert.alert('','两次密码输入不一致！', [{text:'确定'}]);
            } else if(this.state.verifyCode == "") {
                Alert.alert('','请输入验证码！', [{text:'确定'}]);
            } else {
                client.register(this.state.name, this.state.username, this.state.idnumber, this.state.phone, this.state.pwd, function(result) {
                    if(result.success == true) {
                        Alert.alert("", "注册成功！", [{text:'确定', onPress:() => navigator.pop()}]);
                    } else {
                        Alert.alert("", result.err, [{text:'确定'}]);
                    }
                }.bind(this));
            }
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
			<KeyboardAvoidingView behavior={this.state.behavior} style={styles.container}>
			    <View style={styles.bottomContainer}>
			        <View style={styles.textInput}>
    			        <TextInput style={styles.name} placeholder="请输入您的用户名" placeholderTextColor="#ccc" underlineColorAndroid="transparent" onChangeText={(text) => this.setState({username: text})} value={this.state.username} />
			        </View>
			        <View style={styles.textInput}>
    			        <TextInput style={styles.name} placeholder="请输入您的真实姓名" placeholderTextColor="#ccc" underlineColorAndroid="transparent" onChangeText={(text) => this.setState({name: text})} value={this.state.name} />
			        </View>
			        <View style={styles.textInput}>
    			        <TextInput style={styles.name} placeholder="请输入您的手机号" placeholderTextColor="#ccc" underlineColorAndroid="transparent" keyboardType="numeric" onChangeText={(text) => this.setState({phone: text})} value={this.state.phone} />
			        </View>
			        <View style={styles.textInput}>
    			        <TextInput style={styles.name} placeholder="请输入您的身份证号码" placeholderTextColor="#ccc" underlineColorAndroid="transparent" onChangeText={(text) => this.setState({idnumber: text})} value={this.state.idnumber} />
			        </View>
			        <View style={styles.textInput}>
    			        <TextInput style={styles.name} placeholder="请输入密码" placeholderTextColor="#ccc" underlineColorAndroid="transparent" secureTextEntry={true} onChangeText={(text) => this.setState({pwd: text})} value={this.state.pwd} />
			        </View>
			        <View style={styles.textInput}>
    			        <TextInput style={styles.name} placeholder="请再次输入密码" placeholderTextColor="#ccc" underlineColorAndroid="transparent" secureTextEntry={true} onChangeText={(text) => this.setState({check_pwd: text})} value={this.state.check_pwd} />
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
    			        <TouchableHighlight style={styles.button} underlayColor='#cecece' onPress={()=>{this.register();}}>
    			            <Text style={styles.buttonText}>注 册</Text>
                        </TouchableHighlight>
                    </View>
			    </View>
			</KeyboardAvoidingView>
		);
	}
    
    renderNavTitle(route, navigator) {
		return (
			<Text style={styles.navBarTitleText}>
				{route.title}
			</Text>
		);
	}
	
	renderNavLeftButton(route, navigator) {
	    var title = "返回";
	    
		return (
			<TouchableOpacity
				onPress={() => {clearInterval(time);this.setState({verifyButtonBackgroundColor: '#ff5558', count: ''});this.props.navigator.pop();}}
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
				initialRoute={{title:'注册'}}
			/>
		);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#f8f8f8',
        paddingTop: Platform.OS == 'ios' ? 64 : 56,
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