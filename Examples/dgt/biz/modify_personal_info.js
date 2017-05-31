/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, TextInput, Dimensions, Image, Alert, PixelRatio, Platform, Navigator, ListView } from 'react-native';
//import ImagePicker from 'react-native-image-picker';
var ImagePicker ;
if(Platform.OS == 'android' || Platform.OS == 'IOS'){
	// ImagePicker = require('react-native-image-picker');
}else{
	ImagePicker = function(){
		return null;
	}
}
var time = null;

var options = {
    title: '选择头像',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '从相册选择',
    cameraType: 'front',
    mediaType: 'photo',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class ModifyPersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: client.userInfo.userLoginName,
            phone: client.userInfo.userPhoneNumber,
            address: '',
            signature: '',
            avatarSource: {uri: client.userInfo.userAvatar},
            verifyCode: '',
            count: '',
            verifyButtonBackgroundColor: '#ff5558',
        };
    }
    
    componentWillMount() {
        
    }
    
    save() {
        if(this.state.name == "") {
            Alert.alert('','请输入用户名！', [{text:'确定'}]);
            return;
        } else if(this.state.phone == "") {
            Alert.alert('','请输入手机号！', [{text:'确定'}]);
        } else if(this.state.verifyCode == "") {
            Alert.alert('','请输入验证码！', [{text:'确定'}]);
        } else {
            client.modifyUserInfo(client.userInfo.userId, this.state.avatarSource.uri, this.state.name, this.state.phone, this.state.address, this.state.signature, function(result) {
                if(result.success == true) {
                    Alert.alert('','保存成功！', [{text:'确定'}]);
                } else {
                    console.log(result.err);
                }
            });
        }
    }
    
    selectImage() {
		if(Platform.OS == 'web'){
			alert('功能开发中');
        return;
		}
        
        // ImagePicker.showImagePicker(options, (response) => {
        //     console.log('Response = ', response);
        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     } else if (response.customButton) {
        //         console.log('User tapped custom button: ', response.customButton);
        //     } else {
        //         // let source = { uri: response.uri };
                
        //         // You can also display the image using data:
        //         let source = { uri: 'data:image/jpeg;base64,' + response.data };
        //         this.setState({avatarSource: source});
        //     }
        // });
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
			        <View style={styles.viewGroup}>
			            <View style={styles.view}>
			                <Text style={styles.text}>头像</Text>
			                <TouchableOpacity style={styles.icon} onPress={() => {this.selectImage()}}>
			                    <Image source={this.state.avatarSource} style={{width:45,height:45,borderRadius:20}}/>
			                </TouchableOpacity>
			            </View>
			            <View style={{borderWidth: 1 / PixelRatio.get(), borderStyle: 'solid', borderColor: '#e3e3e3'}}/>
    			        <View style={styles.view}>
    			            <Text style={styles.text}>用户名</Text>
    			            <TextInput style={styles.textInput} editable={false} placeholder="请输入名称" placeholderTextColor="#c0bfbf" underlineColorAndroid="transparent" keyboardType="default" onChangeText={(text) => this.setState({name: text})} value={this.state.name} />
    			        </View>
    			        <View style={{borderWidth: 1 / PixelRatio.get(), borderStyle: 'solid', borderColor: '#e3e3e3'}}/>
    			        <View style={styles.view}>
    			            <Text style={styles.text}>手机号</Text>
    			            <TextInput style={styles.textInput} placeholder="请输入手机号" placeholderTextColor="#c0bfbf" underlineColorAndroid="transparent" keyboardType="numeric" onChangeText={(text) => this.setState({phone: text})} value={this.state.phone}/>
    			        </View>
    			        <View style={{borderWidth: 1 / PixelRatio.get(), borderStyle: 'solid', borderColor: '#e3e3e3'}}/>
    			        <View style={styles.view}>
    			            <Text style={styles.text}>验证码</Text>
    			            <TextInput style={styles.textInput} placeholder="请输入验证码" placeholderTextColor="#c0bfbf" underlineColorAndroid="transparent" keyboardType="numeric" onChangeText={(text) => this.setState({verifyCode: text})} value={this.state.verifyCode}/>
    			        </View>
    			        <View style={{borderWidth: 1 / PixelRatio.get(), borderStyle: 'solid', borderColor: '#e3e3e3'}}/>
    			        <TouchableHighlight style={[styles.verifyButton,{backgroundColor:this.state.verifyButtonBackgroundColor}]} underlayColor='#cecece' onPress={()=>{this.getVerifyCode();}}>
			                <Text style={styles.verifyButtonText}>{'获取验证码'+this.state.count}</Text>
                        </TouchableHighlight>
			        </View>
			    </View>
            </View>
		);
	}
    
    renderNavTitle(route, navigator) {
		return (
			<Text style={styles.navBarTitleText}>
			    修改个人信息
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
		var title = "保存";
		
		return (
			<TouchableOpacity
			    onPress={() => this.save()}
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
				initialRoute={{title:'修改个人信息'}}
			/>
		);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:Platform.OS == 'ios' ? 74 : 68,
        backgroundColor: '#f5f5f5',
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
    bottomContainer: {
	    justifyContent: 'flex-start',
	    alignItems: 'center',
	    backgroundColor: '#ffffff',
	    height: Dimensions.get('window').height,
	    width: Dimensions.get('window').width,
	},
	viewGroup: {
	    flex: 1,
	    justifyContent: 'flex-start',
	    width: Dimensions.get('window').width - 32 / PixelRatio.get(),
	    marginLeft: 32 / PixelRatio.get(),
	},
	view: {
	    flexDirection: 'row',
	    height: Dimensions.get('window').height * 120 / 1334,
	    width: Dimensions.get('window').width - 40 / PixelRatio.get(),
	},
	text: {
	    flex: 1,
	    fontSize: 18,
	    height: Dimensions.get('window').height * 120 / 1334,
	    marginLeft: 8 / PixelRatio.get(),
	    marginVertical: Platform.OS == 'ios' ? Dimensions.get('window').height * 40 / 1334 : 0,
	    textAlignVertical: 'center',
	    color: '#595959',
	},
	textInput: {
	    flex: 2.5,
	    fontSize: 18,
	    textAlign: 'right',
	    marginRight: Platform.OS == 'ios' ? 8 / PixelRatio.get() : 0,
	    height: Dimensions.get('window').height * 120 / 1334,
	},
	icon: {
	    flex: 2.5,
	    alignItems: 'flex-end',
	    justifyContent: 'center',
	    marginRight: Platform.OS == 'ios' ? 8 / PixelRatio.get() : 8 / PixelRatio.get(),
	    height: Dimensions.get('window').height * 120 / 1334,
	},
	verifyButton: {
	    marginTop: 20,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#ff5558',
	    height: Dimensions.get('window').height * 80 / 1334,
	    width: Dimensions.get('window').width * 680 / 750,
	    borderRadius: 5,
	},
	verifyButtonText: {
	    color: '#fff',
	    fontSize: 36 / 2,
	}
});