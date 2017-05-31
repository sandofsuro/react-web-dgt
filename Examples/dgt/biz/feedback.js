/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, TextInput, Dimensions, Image, Alert, PixelRatio, Platform, Navigator, ListView } from 'react-native';

export default class FeedBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
        };
    }
    
    componentWillMount() {
        
    }
    
    submit() {
        if(this.state.title == '') {
            Alert.alert('','请输入标题', [{text:'确定'}]);
        } else {
            client.newFeedBack(client.userInfo.userId, this.state.title, this.state.content, function(result) {
                if(result.success == true) {
                    this.props.route.callback();
                    this.props.navigator.pop();
                } else {
                    console.log(result.err);
                }
            }.bind(this));
        }
    }
    
    renderScene(route, navigator) {
        return (
			<View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.topContainer_middle}>
                        <TextInput style={styles.name} placeholder="请输入标题" placeholderTextColor="#ccc" underlineColorAndroid="transparent" onChangeText={(text) => this.setState({title: text})} value={this.state.title} />
                    </View>
                    <View style={styles.topContainer_top}>
                        <TextInput style={styles.textArea} multiline={true}  placeholder="请输入反馈，我们将不断为您改进" placeholderTextColor="#ccc" underlineColorAndroid="transparent" onChangeText={(text) => this.setState({content: text})} value={this.state.content} />
                    </View>
                    <TouchableHighlight style={styles.button} underlayColor='#cecece' onPress={()=>{this.submit()}}>
                        <Text style={styles.buttonText}>提交</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.bottomContainer}>
                    
                </View>
            </View>
		);
    }
    
    /*
    renderScene(route, navigator) {
		return (
			<View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.topContainer_top}>
                        <TextInput style={styles.textArea} multiline={true}  placeholder="请输入反馈，我们将不断为您改进" placeholderTextColor="#ccc" underlineColorAndroid="transparent" onChangeText={(text) => this.setState({content: text})} value={this.state.content} />
                        <Image source={{uri: GLOBAL.WebRoot + 'web/img/personal/video@2x.png'}} style={[styles.video,{marginRight: Platform.OS == 'ios' ? 9 : 13}]} />
                    </View>
                    <View style={styles.topContainer_middle}>
                        <TextInput style={styles.name} placeholder="姓名" placeholderTextColor="#ccc" underlineColorAndroid="transparent" onChangeText={(text) => this.setState({name: text})} value={this.state.name} />
                        <Image source={{uri: GLOBAL.WebRoot + 'web/img/personal/video@2x.png'}} style={styles.video} />
                    </View>
                    <View style={styles.topContainer_middle2}>
                        <TextInput style={styles.phone} placeholder="请输入您的手机号" placeholderTextColor="#ccc" underlineColorAndroid="transparent" keyboardType="numeric" onChangeText={(text) => this.setState({phone: text})} value={this.state.phone} />
                        <Image source={{uri: GLOBAL.WebRoot + 'web/img/personal/video@2x.png'}} style={styles.video} />
                    </View>
                    <View style={styles.topContainer_bottom}>
                        <Text style={styles.text}>拍摄/上传照片</Text>
                        <View style={styles.imageView}>
                            <Image source={{uri: GLOBAL.WebRoot + 'web/img/personal/camera@2x.png'}} style={styles.image} />
                            <Image source={{uri: GLOBAL.WebRoot + 'web/img/personal/upload@2x.png'}} style={styles.image} />
                        </View>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableHighlight style={styles.button} underlayColor='#cecece' onPress={()=>{this.submit();}}>
                        <Text style={styles.buttonText}>提交</Text>
                    </TouchableHighlight>
                </View>
            </View>
		);
	}
	*/
    
    renderNavTitle(route, navigator) {
		return (
			<Text style={styles.navBarTitleText}>
			    新建反映
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
				initialRoute={{title:'新建反映'}}
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
		paddingRight: 10,
		justifyContent: 'center',
	},
	backImage: {
	    width: 23 / 2,
	    height: 41 / 2,
	    marginRight: 5,
	},
	topContainer: {
	    flex: 1.5,
	    backgroundColor: 'white',
	    alignItems: 'center',
	},
	bottomContainer: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	},
	button: {
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#ff5558',
	    height: Dimensions.get('window').height * 80 / 1334,
	    width: Dimensions.get('window').width * 680 / 750,
	    borderRadius: 5,
	    marginTop: 30,
	},
	buttonText: {
	    color: '#fff',
	    fontSize: 36 / 2,
	},
	topContainer_top: {
	    alignItems: 'flex-end',
	    paddingLeft: Platform.OS == 'ios' ? 10 : 0,
	    marginTop: 10 / 2,
	    height: Dimensions.get('window').height * 320 / 1334,
	    width: Dimensions.get('window').width * 680 / 750,
	    borderColor: '#ccc',
	    borderWidth: 1 / PixelRatio.get(),
	    borderStyle: 'solid',
	    borderRadius: 5,
	},
	topContainer_middle: {
	    flexDirection: 'row',
	    alignItems: 'center',
	    paddingLeft: Platform.OS == 'ios' ? 10 : 0,
	    marginTop: 42 / PixelRatio.get(),
	    marginBottom: 28 / PixelRatio.get(),
	    height: Dimensions.get('window').height * 90 / 1334,
	    width: Dimensions.get('window').width * 680 / 750,
	    borderColor: '#ccc',
	    borderWidth: 1 / PixelRatio.get(),
	    borderStyle: 'solid',
	    borderRadius: 5,
	},
	topContainer_middle2: {
	    flexDirection: 'row',
	    alignItems: 'center',
	    paddingLeft: Platform.OS == 'ios' ? 10 : 0,
	    marginBottom: 42 / PixelRatio.get(),
	    height: Dimensions.get('window').height * 90 / 1334,
	    width: Dimensions.get('window').width * 680 / 750,
	    borderColor: '#ccc',
	    borderWidth: 1 / PixelRatio.get(),
	    borderStyle: 'solid',
	    borderRadius: 5,
	},
	topContainer_bottom: {
	    width: Dimensions.get('window').width * 680 / 750,
	    justifyContent: 'flex-start',
	    alignItems: 'flex-start'
	},
	textArea: {
	    fontSize: 30 / 2,
	    textAlignVertical: 'top',
	    height: Dimensions.get('window').height * 260 / 1334,
	    width: Platform.OS == 'ios' ? Dimensions.get('window').width * 660 / 750 : Dimensions.get('window').width * 680 / 750,
	},
	name: {
	    fontSize: 30 / 2,
	    height: Dimensions.get('window').height * 90 / 1334,
	    width: Platform.OS == 'ios' ? Dimensions.get('window').width * 600 / 750 : Dimensions.get('window').width * 620 / 750,
	},
	phone: {
	    fontSize: 30 / 2,
	    height: Dimensions.get('window').height * 90 / 1334,
	    width: Platform.OS == 'ios' ? Dimensions.get('window').width * 600 / 750 : Dimensions.get('window').width * 620 / 750,
	},
	text: {
	    color: '#999',
	    fontSize: 28 / 2,
	    marginBottom: 28 / PixelRatio.get(),
	},
	imageView: {
	    flexDirection: 'row',
	    justifyContent: 'flex-start',
	},
	image: {
	    width: 43,
	    height: 43,
	    marginRight: 38 / PixelRatio.get(),
	},
	video: {
	    width: 14,
	    height: 20,
	}
});