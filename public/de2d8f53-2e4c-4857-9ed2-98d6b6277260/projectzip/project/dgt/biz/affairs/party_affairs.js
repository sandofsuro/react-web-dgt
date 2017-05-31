'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, View, Text, Dimensions, TouchableOpacity, TouchableHighlight, PixelRatio, ScrollView } from 'react-native';

import NewsList from '../../components/newslist.js';
import News from '../../components/news';

var party_public = [
    {'title':'郭新占乡长督导检查人口抽样入户调查工作','url':'http://60.205.123.212/dgt/dangwugongkai/1.html'}, 
    {'title':'副区长周新春带队来我乡对人口调控工作落实情况进行重点','url':'http://60.205.123.212/dgt/dangwugongkai/2.html'}, 
    {'title':'北京市第 11 期局级领导干部研究班第三小组赴卢沟桥乡调研','url':'http://60.205.123.212/dgt/dangwugongkai/3.html'},
    {'title':'市区人大领导到我乡检查选民登记工作','url':'http://60.205.123.212/dgt/dangwugongkai/4.html'}
    ];
    
var party_activity = [
    {'title':'区委常委、副区长吴继东带队对我乡和谐广场进行安全检查','url':'http://60.205.123.212/dgt/dangjiandongtai/1.html'}, 
    {'title':'区委常委、常务副区长刘宇带队听取卢沟桥乡党风廉政建设','url':'http://60.205.123.212/dgt/dangjiandongtai/2.html'}, 
    {'title':'北京市国土资源局丰台分局调研我乡国土资源管理工作','url':'http://60.205.123.212/dgt/dangjiandongtai/3.html'},
    {'title':'市领导林克庆视察我乡 煤改电工作进展情况','url':'http://60.205.123.212/dgt/dangjiandongtai/4.html'}
    ];

class PARTYAFFAIRS extends Component {
    constructor(props){
        super(props);
        this.state = {
            party_public:[],
            party_activity:[],
        };            
    }
    
    componentWillMount() {
        client.getArticles('party_public,party_activity', function(responseData) {
            if(responseData.success == true) {
                var party_public = [];
                var party_activity = [];
                for(var i=0;i<responseData.data.length;i++) {
                    if(responseData.data[i].topic == "party_public") {
                        party_public.push(responseData.data[i]);
                    }
                    if(responseData.data[i].topic == "party_activity") {
                        party_activity.push(responseData.data[i]);
                    }
                }
                this.setState({
                    party_public: party_public,
                    party_activity: party_activity,
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
            list: list,
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
                        <Text style={styles.text}  numberOfLines={1}>
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
                    <Image source={require('../../img/affairs/dwgk@2x.png')} style={{width:25,height:25,marginLeft:10}}/>                
                    <Text style={styles.titleText}>党务公开</Text>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{this.openList('党务公开',  this.state.party_public);}}>
                        <Image source={require('../../img/affairs/more@2x.png')} style={{width:25,height:25,marginRight:15}}/>                
                    </TouchableHighlight>
                </View>
                <ScrollView style={{flex:1, width: Dimensions.get('window').width}}>
                    {this.state.party_public.map((lineData)=>(this._renderLine(lineData)))}
                </ScrollView>
                <View style={[styles.titleContainer, {marginTop:13}]}>
                    <Image source={require('../../img/affairs/djdt2@2x.png')} style={{width:25,height:25,marginLeft:10}}/>                
                    <Text style={styles.titleText}>党建动态</Text>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{this.openList('党建动态',  this.state.party_activity);}}>
                        <Image source={require('../../img/affairs/more@2x.png')} style={{width:25,height:25,marginRight:15}}/>                
                    </TouchableHighlight>
                </View>
                <ScrollView style={{flex:1, width: Dimensions.get('window').width}}>
                    {this.state.party_activity.map((lineData)=>(this._renderLine(lineData)))}
                </ScrollView>
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
        // width:Dimensions.get('window').width-75,
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

export default PARTYAFFAIRS;