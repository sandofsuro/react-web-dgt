/**
* 东管头村APP
* @author nectar
* Thu Dec 29 16:33:24 CST 2016
*/
'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, View, Text, Dimensions, PixelRatio, TouchableOpacity, Platform, Alert, AsyncStorage } from 'react-native';
import FeedBackList from './feedback_list';
import Prize from './prize';
import Quiz from './quiz';
import ModifyPersonalInfo from './modify_personal_info';
import ModifyPassword from './modify_password';
import Login from './login';

var lastLoginResultKey = 'lastloginresult';

// var listData = [{'name':'奖品列表','icon':'Prize'}, {'name':'问卷调查','icon':'wenjuandiaocha'}, {'name':'反映情况','icon':'fanyingqingkuang'}, {'name':'注销','icon':'zuxiao'}];
var listData = [{'name':'问卷调查','icon':'wenjuandiaocha'}, {'name':'反映情况','icon':'fanyingqingkuang'}, {'name':'密码修改','icon':'xiugai'}, {'name':'注销','icon':'zuxiao'}];

class Personal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    componentWillMount() {
        
    }
    
    openPage(name) {
        if(name == '反映情况') {
            this.props.navigator.push({
                component: FeedBackList,
                name: 'FeedBackList'
            });
        } else if(name == '奖品列表') {
            this.props.navigator.push({
                component: Prize,
                name: 'Prize'
            });
        } else if(name == '问卷调查') {
            this.props.navigator.push({
                component: Quiz,
                name: 'Quiz'
            });
        } else if(name == '密码修改') {
            this.props.navigator.push({
                component: ModifyPassword,
                name: 'ModifyPassword'
            });
        } else if(name == '注销') {
            Alert.alert('','确定注销吗？', [{text:'确定', onPress: () => {}},{text:'取消'}]);
        }
    }
    
    //  zhuxiao() {
    //     await AsyncStorage.setItem(lastLoginResultKey, 'false');
    //     navigator.replace({
    //         component: Login,
    //         name: 'Login'
    //     });
    // }
    
    modifyPersonalInfo() {
        this.props.navigator.push({
            component: ModifyPersonalInfo,
            name: 'ModifyPersonalInfo'
        });
    }
    
    _renderLine(lineData, i){
        return (
            <View style={styles.lineContainer} key={i}>
                <TouchableOpacity
                onPress={() => {this.openPage(lineData.name)}}
                style={styles.touchable}>
                <View style={styles.bottomBorder}>
                    <View style={styles.iconContainer}>
                        <Image source={require('../img/personal/'+lineData.icon+'@2x.png')} style={lineData.name == '反映情况' || lineData.name == '注销' ? styles.fanying_image : styles.image} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            {lineData.name}
                        </Text>
                    </View>
                    <View style={styles.arrowContainer}>
                        <Image source={require('../img/personal/'+'Arrow@2x.png')} style={styles.arrow_image} />
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        );
    }
    
    render() {
        return (
        <View style={styles.container}>
            <View style={styles.top_container}>
                <Image source={require('../img/personal/'+'bg.jpg')} resizeMode='stretch' style={{width:Dimensions.get('window').width, flex:1}}/>
                <TouchableOpacity style={styles.info_container} onPress={() => {this.modifyPersonalInfo()}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={{uri: client.userInfo.userAvatar}} style={{width:70.5,height:70,borderRadius:35}}/>
                        <Text style={{color:'white',fontSize:20,marginTop: 5, marginBottom: 3, backgroundColor:'transparent'}}>{client.userInfo.userLoginName}</Text>
                        <View style={styles.mark_container}>
                            <Image source={require('../img/personal/'+'mark@2x.png')} style={{width:110,height:25}}/>
                            <Text style={{color:'#ffe655',fontSize:15,backgroundColor:'transparent', position:'absolute', right: 10, top: Platform.OS == 'ios' ? 3 : 1.5}}>{client.userInfo.userScore+'积分'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.bottom_container}>
            {listData.map((lineData, i)=>(this._renderLine(lineData,i)))}
            </View>
        </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    top_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom_container: {
        flex: 2,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    info_container: {
        zIndex: 1,
        position:'absolute',
        top: Dimensions.get('window').height / 14,
        left: Dimensions.get('window').width / 2 - 55,
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mark_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lineContainer:{
        width:Dimensions.get('window').width-50,
        height:50,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#e3e3e3',
        borderStyle: 'solid',     
        backgroundColor:'#ffffff',
        borderLeftWidth: 0,
        borderRight:'none',
        borderTopWidth: 0,
        marginLeft: 25,
        marginRight:25,
    },
    touchable: {
        flex: 1,
        flexDirection: 'row',
    },
    bottomBorder: {
        flex: 1,
        flexDirection: 'row',
    },
    textContainer: {
        flex: 6,
        height:50,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    text: {
        fontSize: 18,
        marginLeft: 8,
        color: '#666666',
    },
    iconContainer: {
        flex: 1,
        alignItems: 'flex-start',
        alignSelf: 'center',
    },
    arrowContainer:{
        marginRight: Dimensions.get('window').width * 20 / 750,
        alignItems: 'flex-end',
        alignSelf: 'center',
    },
    image: {
        height: 18,
        width: 18,
    },
    fanying_image: {
        height: 20,
        width: 18,
    },
    arrow_image: {
        height: 22,
        width: 12,
    }
});

module.exports=Personal;