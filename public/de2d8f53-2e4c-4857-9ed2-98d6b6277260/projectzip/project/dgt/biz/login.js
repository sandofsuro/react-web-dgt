/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, TextInput, Dimensions, Image, Alert, AsyncStorage } from 'react-native';

import Portal from './portal';
import Register from './register';

var KeyboardAvoidingView = View;
var userNameKey = 'username';
var passwordKey = 'password';
var lastLoginTimeKey = 'lastlogintime';
var lastLoginResultKey = 'lastloginresult';

export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            userNameText: null,
            passwordText: null,
            registerColor: '#999',
            rememberColor: '#999',
            rememberIcon: 'rememberPwd',
            userNameColor: '#ccc',
            userNameBorderColor: '#ccc',
            passwordColor: '#ccc',
            passwordBorderColor: '#ccc',
            behavior: 'padding',
            namePlaceholder:'请输入用户名',
            passPlaceholder:'请输入密码',
        };
    }
    
    componentDidMount() {
        AsyncStorage.getItem(userNameKey)
        .then((value1) => {
            this.setState({userName: value1});
            AsyncStorage.getItem(passwordKey)
            .then((value2) => {
                this.setState({password: value2});
                if(value2 != null) {
                    this.setState({rememberIcon: "rememberPwdSelect", rememberColor: "#56ab23"});
                }
            })
            .catch((err) => {
                console.log(err);
            });
        })
        .catch((err) => {
           console.log(err); 
        });
    }
    
    login(){
        // this.props.navigator.push({
        //                 component: Portal,
        //                 name: 'Portal'
        //             });
        if(this.state.userName == null || this.state.userName == "") {
            Alert.alert("用户名", "请输入用户名！", [{text:'确定'}]);
            return;
        } else if(this.state.password == null || this.state.password == "") {
            Alert.alert("密码", "请输入密码！", [{text:'确定'}]);
            return;
        } else {
            client.login(this.state.userName, this.state.password, function(result) {
                if(result.success == true) {
                    AsyncStorage.setItem(lastLoginResultKey, 'true');
                    AsyncStorage.setItem(lastLoginTimeKey, (new Date().getTime()).toString());
                    AsyncStorage.setItem(userNameKey, this.state.userName);
                    if(this.state.rememberIcon == "rememberPwdSelect" && this.state.rememberColor == "#56ab23") {
                        AsyncStorage.setItem(passwordKey, this.state.password);
                    } else {
                        this.setState({password: ''});
                        AsyncStorage.removeItem(passwordKey);
                    }
                    this.props.navigator.push({
                        component: Portal,
                        name: 'Portal'
                    });
                } else {
                    this.setState({userName: '', password: ''});
                    AsyncStorage.setItem(lastLoginResultKey, 'false');
                    AsyncStorage.removeItem(userNameKey);
                    AsyncStorage.removeItem(passwordKey);
                    Alert.alert("", result.error, [{text:'确定'}]);
                }
            }.bind(this));
        }
    }
    
    rememberPassword() {
        if(this.state.rememberIcon == "rememberPwd" && this.state.rememberColor == "#999") {
            this.setState({
                rememberIcon:'rememberPwdSelect',
                rememberColor:'#56ab23',
            });
        } else {
            this.setState({
                rememberIcon:'rememberPwd',
                rememberColor:'#999',
            });
        }
    }
    
    register() {
        this.props.navigator.push({
            component: Register,
            name: 'Register'
        });
    }
    
    renderScene() {
        return (
            <View style={styles.innercontainer}>
                <Image source={require('../img/DGT_logo.png')} style={styles.logo_image}/>
                <KeyboardAvoidingView behavior={this.state.behavior} style={styles.textInput}>
                    <View style={[styles.userNameLayout, {borderColor:this.state.userNameBorderColor}]}>
                        <Image source={require('../img/login/user-icon@2x.png')} style={styles.userName_image}/>
                        <TextInput ref={(userNameText) => {this.userNameText = userNameText;}}
                            style={[styles.userName, {color:this.state.userNameColor}]}
                            onFocus={()=>{this.setState({userNameColor:'#999', userNameBorderColor:"#ff5559"})}}
                            onBlur={()=>{this.setState({userNameColor:'#ccc', userNameBorderColor:"#ccc"})}}
                            onChangeText={(text) => {var p='请输入用户名!'
                                if(text!=''){
                                p=''
                                }
                                this.setState({userName: text,namePlaceholder:p});
                                }}
                            underlineColorAndroid="transparent"
  
                            placeholderTextColor="transparent"
                            value={this.state.userName} />
                    </View>
                    <View style={[styles.passwordLayout, {borderColor:this.state.passwordBorderColor}]}>
                        <Image source={require('../img/login/password-icon@2x.png')} style={styles.password_image}/>
                        <TextInput ref={(passwordText) => {this.passwordText = passwordText;}}
                            style={[styles.password, {color:this.state.passwordColor}]}
                            onFocus={()=>{this.setState({passwordColor:'#999', passwordBorderColor:"#ff5559"})}}
                            onBlur={()=>{this.setState({passwordColor:'#ccc', passwordBorderColor:"#ccc"})}}
                            onChangeText={(text) => {
                                var p='请输入密码!'
                                if(text!=''){
                                p=''
                                }
                                this.setState({password: text,passPlaceholder:p});
                                }}
                            underlineColorAndroid="transparent"
                            placeholder=''
                            placeholderTextColor="#ccc"
                            secureTextEntry={true}
                            value={this.state.password} />
                    </View>
                    <TouchableHighlight style={styles.button} underlayColor='#cecece' onPress={()=>{
                        //webfix this.userNameText.blur();
                        //webfix this.passwordText.blur();
                        this.login();}}>
                        <Text style={styles.buttonText}>登 录</Text>
                    </TouchableHighlight>
                    <View style={styles.bottomLayout}>
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                            <TouchableHighlight underlayColor="transparent" onPress={()=>{this.rememberPassword();}}>
                                <View style={{flexDirection:'row', alignItems: 'center'}}>
                                    <Image source={require('../img/login/'+this.state.rememberIcon+'@2x.png')} style={styles.remember_image}/>
                                    <Text style={[styles.remember, {color:this.state.rememberColor}]}>记住密码</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <TouchableHighlight underlayColor="transparent" onPress={()=>{this.register();}} onShowUnderlay={()=>{this.setState({registerColor:'#ff5559'})}} onHideUnderlay={()=>{this.setState({registerColor:'#999'})}}>
                                <Text style={[styles.register, {color:this.state.registerColor}]}>注册</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
    
    render() {
        return (
            <View style={styles.container}>
                {this.renderScene()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innercontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff5558',
        height: Dimensions.get('window').height * 90 / 1334,
        width: Dimensions.get('window').width * 620 / 750,
        borderRadius: 5,
        marginTop: Dimensions.get('window').height * 50 / 1334,
    },
    buttonText: {
        color: '#fff',
        fontSize: 36 / 2,
    },
    textInput: {
        marginBottom: Dimensions.get('window').height * 85 / 1334,
    },
    userNameLayout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1 / 2,
    },
    passwordLayout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1 / 2,
        marginTop: Dimensions.get('window').height * 50 / 1334,
    },
    userName: {
        textAlign: 'left',
        fontSize: 30 / 2,
        height: Dimensions.get('window').height * 90 / 1334,
        width: Dimensions.get('window').width * 620 / 750,
        paddingLeft: 35,
    },
    password: {
        textAlign: 'left',
        fontSize: 30 / 2,
        height: Dimensions.get('window').height * 90 / 1334,
        width: Dimensions.get('window').width * 620 / 750,
        paddingLeft: 35,
    },
    bottomLayout: {
        flexDirection: 'row',
        marginTop: Dimensions.get('window').height * 50 / 1334,
        alignItems: 'center',
        height: Dimensions.get('window').height * 90 / 1334,
        width: Dimensions.get('window').width * 620 / 750,
    },
    register: {
        fontSize: 30 / 2,
    },
    remember: {
        fontSize: 30 / 2,
    },
    logo_image: {
        width: 150,
        height: 150,
        marginBottom: 50,
    },
    userName_image: {
        width: 42 / 2,
        height: 42 / 2,
        position:'absolute',
        left: 10,
        top: 10,
    },
    password_image: {
        width: 34 / 2,
        height: 42 / 2,
        position:'absolute',
        left: 10,
        top: 10,
    },
    remember_image: {
        width: 36 / 2,
        height: 36/ 2,
        marginRight: 8,
    }
});