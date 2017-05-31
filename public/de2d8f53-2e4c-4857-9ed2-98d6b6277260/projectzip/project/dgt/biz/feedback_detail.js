/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, TextInput, Dimensions, Image, Alert, Platform, Navigator, ScrollView, KeyboardAvoidingView } from 'react-native';
import moment from 'moment';

// var record = [{'date':'2017-02-10','name':'刘会计','avatar':'https://beecode-usercenter.oss-cn-beijing.aliyuncs.com/570cb76707784c8800ed1de3','content':'这件事我已经帮你办妥了。'},{'date':'2017-02-10','name':'张三','avatar':'https://beecode-usercenter.oss-cn-beijing.aliyuncs.com/570cb76707784c8800ed1de3','content':'谢谢了，但是我还有另一个请求，希望您能给帮忙办理一下，我家暖气不热，室内温度没有达到供暖标准，问了邻居，发现他们的都正常，我觉得可能是我家暖气出了问题，您看能不能联系一下物业抽空帮忙来看一下。'},{'date':'2017-02-11','name':'刘会计','avatar':'https://beecode-usercenter.oss-cn-beijing.aliyuncs.com/570cb76707784c8800ed1de3','content':'好的，我帮你联系一下。'}];

export default class FeedBackDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reply: '',
            behavior: 'padding',
            record: [],
            color: '#ff5558',
        };
    }
    
    componentWillMount() {
        if(this.props.route.data.status == 'closed') {
            this.setState({color: '#e3e3e3'});
        }
        this.setState({
           record: this.props.route.data.details, 
        });
    }
    
    submit() {
        if(this.props.route.data.status == 'closed') {
            Alert.alert('','反映情况已关闭，无法提交！', [{text:'确定'}]);
        } else if(this.state.reply == '') {
            Alert.alert('','请输入要提交的内容！', [{text:'确定'}]);
        } else {
            client.appendFeedBack(this.props.route.data._id, client.userInfo.userId, this.state.reply, function(result) {
                if(result.success == true) {
                    this.setState({
                        reply: '',
                        record: result.data.details,
                    });
                    Alert.alert('', '提交成功！', [{text:'确定'}]);
                } else {
                    console.log(result.err);
                }
            }.bind(this));
        }
    }
    
    renderScene(route, navigator) {
        let recordList = this.state.record.map((rowData,i) => {
            if(rowData.user.name == client.userInfo.userRealName) {
                return (
                    <View style={styles.row} key={i}>
                        <View style={styles.topContentContainer}>
                            <Text style={styles.dateText}>{moment(rowData.create_at).format('YYYY-MM-DD')+'  '+rowData.user.name}</Text>
                        </View>
                        <View style={[styles.bottomContentContainer,{justifyContent: 'flex-end'}]}>
                            <Text style={styles.contentText}>{rowData.content}</Text>
                            <Image source={{uri: rowData.user.avatar_url}} style={{width:40,height:40,borderRadius:20,marginLeft: 10,marginRight: 10}} />
                        </View>
                    </View>
                );
            } else {
                return (
                    <View style={styles.row} key={i}>
                        <View style={styles.topContentContainer}>
                            <Text style={styles.dateText}>{moment(rowData.create_at).format('YYYY-MM-DD')+'  '+rowData.user.name}</Text>
                        </View>
                        <View style={[styles.bottomContentContainer,{justifyContent: 'flex-start'}]}>
                            <Image source={{uri: rowData.user.avatar_url}} style={{width:40,height:40,borderRadius:20,marginLeft: 10,marginRight: 10}} />
                            <Text style={styles.contentText}>{rowData.content}</Text>
                        </View>
                    </View>
                );
            }
        });
		return (
			<View style={styles.container}>
			    <View style={styles.topContainer}>
			        <View style={styles.topContainer_top}>
			            <Text style={styles.commitManText}>提交人：{this.props.route.data.user.name}</Text>
			            <Text style={styles.commitDateText}>提交日期：{moment(this.props.route.data.create_at).format('YYYY-MM-DD')}</Text>
			        </View>
			        <ScrollView style={styles.topContainer_bottom}>
			            <Text style={styles.commitContentText}>{this.props.route.data.content}</Text>
			        </ScrollView>
			    </View>
			    <KeyboardAvoidingView behavior={this.state.behavior} style={styles.bottomContainer}>
			        <ScrollView style={styles.bottomContainer_top}>
			        {recordList}
			        </ScrollView>
			        <View style={styles.bottomContainer_bottom}>
			            <View style={styles.textInputView}>
			                <TextInput style={styles.textInput} multiline={true} placeholder="请输入内容" placeholderTextColor="#c0bfbf" underlineColorAndroid="transparent" keyboardType="default" onChangeText={(text) => this.setState({reply: text})} value={this.state.reply}/>
			            </View>
			            <TouchableHighlight style={[styles.button,{backgroundColor: this.state.color}]} underlayColor='#cecece' onPress={() => {this.submit()}}>
			                <Text style={styles.buttonText}>提交</Text>
			            </TouchableHighlight>
			        </View>
			    </KeyboardAvoidingView>
            </View>
		);
	}
    
    renderNavTitle(route, navigator) {
		return (
			<Text style={styles.navBarTitleText}>
			    反映详情
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
				initialRoute={{title:'反映详情'}}
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
	topContainer: {
	    flex: 1,
	    backgroundColor: 'white',
	    width: Dimensions.get('window').width,
	},
	bottomContainer: {
	    flex: 2,
	    width: Dimensions.get('window').width,
	},
	topContainer_top: {
	    flex: 1,
	    flexDirection: 'row',
	    justifyContent: 'space-between',
	    alignItems: 'center',
	    borderBottomWidth: 0.5,
	    borderBottomColor: '#e3e3e3',
	    borderStyle: 'solid',
	},
	topContainer_bottom: {
	    flex: 4,
	},
	commitManText: {
	    color: '#666666',
	    fontSize: 32 / 2,
	    marginLeft: 15,
	},
	commitDateText: {
	    color: '#666666',
	    fontSize: 32 / 2,
	    marginRight: 15,
	},
	commitContentText: {
	    color: '#666666',
	    fontSize: 30 / 2,
	    marginTop: 10,
	    marginLeft: 15,
	    marginRight: 15,
	    marginBottom: 10,
	},
	bottomContainer_top: {
	    flex: 6,
	    width: Dimensions.get('window').width,
	},
	bottomContainer_bottom: {
	    flex: 1,
	    height: 40,
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginLeft: 15,
	    marginRight: 15,
	},
	textInputView: {
	    flex: 4,
	    height: 40,
	    backgroundColor: 'white',
	    borderTopLeftRadius: 5,
	    borderBottomLeftRadius: 5,
	},
	textInput: {
	    flex: 1,
	    height: 40,
	    fontSize: 36 / 2,
	    margin: 0,
	    padding: 0,
	},
	button: {
	    flex: 1,
	    height: 40,
	    justifyContent: 'center',
	    alignItems: 'center',
	    borderTopRightRadius: 5,
	    borderBottomRightRadius: 5,
	},
	buttonText: {
	    color: 'white',
	    fontSize: 36 / 2,
	},
	row: {
	    width: Dimensions.get('window').width,
	    marginBottom: 10,
	},
	topContentContainer: {
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginBottom: 10,
	},
	bottomContentContainer: {
	    flexDirection: 'row',
	    alignItems: 'center',
	},
	dateText: {
	    color: '#666666',
	    fontSize: 30 / 2,
	},
	contentText: {
	    color: '#666666',
	    width: Dimensions.get('window').width * 2 / 3,
	    fontSize: 30 / 2,
	    backgroundColor: 'white',
	    borderWidth: 1,
	    borderStyle: 'solid',
	    borderColor: '#e3e3e3',
	    borderRadius: 5,
	    padding: 10,
	}
});