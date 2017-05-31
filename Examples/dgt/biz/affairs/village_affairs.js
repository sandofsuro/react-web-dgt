'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, View, Text, Dimensions, TouchableOpacity, TouchableHighlight, PixelRatio } from 'react-native';

import NewsList from '../../components/newslist.js';
import News from '../../components/news';

var village_public = [
    {'title':'2016年丰台区26件重要民生实事项目全面落实','url':'http://60.205.123.212/dgt/cunwugongkai/1.html'}, 
    {'title':'丰台区卢沟桥乡人民政府信息公开受理机构','url':'http://60.205.123.212/dgt/cunwugongkai/2.html'}, 
    {'title':'卢沟桥乡“煤改电”工作正式进入户内线施工设备安装阶段','url':'http://60.205.123.212/dgt/cunwugongkai/3.html'},
    {'title':'2016年1-7月丰台区经济运行情况简析','url':'http://60.205.123.212/dgt/cunwugongkai/4.html'}
    ];
    
var village_activity = [
    {'title':'卢沟桥乡全面打击劣质燃煤 上下联动成效明显','url':'http://60.205.123.212/dgt/cunwudongtai/1.html'}, 
    {'title':'东管头村综治办环境整治情况','url':'http://60.205.123.212/dgt/cunwudongtai/2.html'}, 
    {'title':'东管头村综治办食品卫生工作情况','url':'http://60.205.123.212/dgt/cunwudongtai/3.html'},
    {'title':'东管头村综治办违法建设工作情况','url':'http://60.205.123.212/dgt/cunwudongtai/4.html'}
    ];

class VILLAGEAFFAIRS extends Component {
    constructor(props){
        super(props);
        this.state = {
            village_public:[],
            village_activity:[],
        };           
    }
    
    componentWillMount() {
        client.getArticles('village_public,village_activity', function(responseData) {
            if(responseData.success == true) {
                var village_public = [];
                var village_activity = [];
                
                for(var i=0;i<responseData.data.length;i++) {
                    if(responseData.data[i].topic == "village_public") {
                        village_public.push(responseData.data[i]);
                    }
                    if(responseData.data[i].topic == "village_activity") {
                        village_activity.push(responseData.data[i]);
                    }
                }
                this.setState({
                    village_public: village_public,
                    village_activity: village_activity,
                });                  
            } else {
                console.warn(responseData.err);
            }
        }.bind(this));
    }    
    
    openContent(data) {
       this.props.navigator.push({
           component: News,
           name:'',
           title:data.title,
           url:data.url,
       });
    }
    
    openList(name, list) {
        this.props.navigator.push({
            component: NewsList,
            title: name,
            list:list,
        });
    }        
    
    _renderLine(lineData){
        return (
            <View style={styles.lineContainer} key={Math.random(0,100000)}>
                <TouchableOpacity
                style={styles.touchable}
                onPress={()=>{this.openContent({'title':lineData.title, 'url':lineData.url});}}>
                <View style={styles.bottomBorder}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text} numberOfLines={1}>
                            {lineData.title}                            
                        </Text>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        );
    }  
    
    render(){
        return(
            <View style={styles.container}>
                <View style={[styles.titleContainer, {marginTop:13}]}>
                    <Image source={require('../../img/affairs/cwgk@2x.png')} style={{width:25,height:25,marginLeft:10}}/>                
                    <Text style={styles.titleText}>村务公开</Text>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{this.openList('村务公开', this.state.village_public);}}>
                        <Image source={require('../../img/affairs/more@2x.png')} style={{width:25,height:25,marginRight:15}}/>                
                    </TouchableHighlight>
                </View>
                <View style={{flex:1, width: Dimensions.get('window').width}}>
                    {this.state.village_public.map((lineData)=>(this._renderLine(lineData)))}
                </View>
                <View style={[styles.titleContainer, {marginTop:13}]}>
                    <Image source={require('../../img/affairs/cwdt@2x.png')} style={{width:25,height:25,marginLeft:10}}/>                
                    <Text style={styles.titleText}>村建动态</Text>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{this.openList('村建动态',  this.state.village_activity);}}>
                        <Image source={require('../../img/affairs/more@2x.png')} style={{width:25,height:25,marginRight:15}}/>                
                    </TouchableHighlight>                        
                </View>
                <View style={{flex:1, width: Dimensions.get('window').width}}>
                    {this.state.village_activity.map((lineData)=>(this._renderLine(lineData)))}
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
        backgroundColor: '#F5F5F5',
    },
    titleContainer:{
        // flex:1,
        height:50,
        flexDirection: 'row',
        justifyContent:'flex-start',
        width: Dimensions.get('window').width,
        alignItems:'center',
        backgroundColor:'white',
    //   borderColor: 'black',
    //   borderStyle: 'solid',
    //   borderWidth: 1,        
    },
    titleText:{
        flex:1,
        marginLeft:5,
        fontSize:20,
        color:'#ff4c50',
    },
    lineContainer:{
        // margin:10,
        // flex:1,
        height:40,
        flexDirection: 'row',
        // backgroundColor: 'white',
        alignItems: 'center',
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#C8C7CC',
        borderStyle: 'solid',     
        backgroundColor:'#ffffff',
        
        // borderColor:'#f00056',
        // borderStyle:'solid',
        // borderWidth:1,
    },  
    touchable: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'white',
        // underlayColor:'#D9D9D9',
    },   
    bottomBorder: {
        flex: 1,
        // borderWidth: 1 / PixelRatio.get(),
        // borderColor: '#C8C7CC',
        // borderStyle: 'solid',
        flexDirection: 'row',
        
        // borderTopWidth:1,
        // borderTopColor:'#000000',
    },    
    textContainer: {
        flex: 3,
        height:40,
        // flexDirection: 'row',
        // marginTop: 18,
        // marginBottom: 10,
        alignItems: 'flex-start',
        justifyContent:'center',
        // alignSelf:'center',
        marginLeft:10,
        // borderColor:'#f00056',
        // borderStyle:'solid',
        // borderWidth:1,        
    },       
    text: {
        // flex: 1,
                // height:50,
        fontSize: 15,
        marginLeft: 15,
        //         borderColor:'#f00056',
        // borderStyle:'solid',
        // borderWidth:1,  
        // alignSelf: 'center',
    },     
});

export default VILLAGEAFFAIRS;