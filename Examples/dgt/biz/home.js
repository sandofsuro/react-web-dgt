/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, View, Text, Dimensions, TouchableHighlight, Alert, ListView, TouchableOpacity, PixelRatio, Platform, RefreshControl } from 'react-native';
import Register from './register';
import NewsList from '../components/newslist.js'
import News from '../components/news.js';
import PhoneList from './phone_list.js';
import SignIn from './signin.js';
import Swiper from '../components/swiper.js';

var carousel = [];
var tipsList = [];

class HOME extends Component{
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            profile:"",
            village:"",
            notice:[],
            hospital:[],
            guide:[],
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        };
    }
    componentWillMount() {
        carousel = [];
        tipsList = [];
        //查询简介、村容村貌、温馨提示、为您推荐、公告、社区医疗、办事指南
        client.getArticles('profile,village,carousel,recommend,tips,notice,hospital,guide', function(responseData) {
            if(responseData.success == true) {
                var recommendList = [];
                var profileUrl = "";
                var villageUrl = "";
                var noticeUrl = [];
                var hospitalUrl = [];
                var guideUrl = [];
                for(var i=0;i<responseData.data.length;i++) {
                    if(responseData.data[i].topic == "carousel") {
                        carousel.push(responseData.data[i]);
                    }
                    if(responseData.data[i].topic == "recommend") {
                        recommendList.push(responseData.data[i]);
                    }
                    if(responseData.data[i].topic == "tips") {
                        tipsList.push(responseData.data[i]);
                    }
                    if(responseData.data[i].topic == "profile") {
                        profileUrl = responseData.data[i].url;
                    }
                    if(responseData.data[i].topic == "village") {
                        villageUrl = responseData.data[i].url;
                    }
                    if(responseData.data[i].topic == "notice") {
                        noticeUrl.push(responseData.data[i]);
                    }
                    if(responseData.data[i].topic == "hospital") {
                        hospitalUrl.push(responseData.data[i]);
                    }
                    if(responseData.data[i].topic == "guide") {
                        guideUrl.push(responseData.data[i]);
                    }
                }
                this.setState({
                    profile: profileUrl,
                    village: villageUrl,
                    notice:noticeUrl,
                    hospital:hospitalUrl,
                    guide:guideUrl,
                    dataSource: this.state.dataSource.cloneWithRows(recommendList),
                });
            } else {
                console.warn(responseData.err);
            }
        }.bind(this));
    }
    
    _onRefresh() {
        carousel = [];
        tipsList = [];
        this.setState({refreshing: true});
        client.getArticles('carousel,recommend,tips', function(responseData) {
            if(responseData.success == true) {
                var recommendList = [];
                for(var i=0;i<responseData.data.length;i++) {
                    if(responseData.data[i].topic == "carousel") {
                        carousel.push(responseData.data[i]);
                    }
                    if(responseData.data[i].topic == "recommend") {
                        recommendList.push(responseData.data[i]);
                    }
                    if(responseData.data[i].topic == "tips") {
                        tipsList.push(responseData.data[i]);
                    }
                }
                this.setState({
                    refreshing: false,
                    dataSource: this.state.dataSource.cloneWithRows(recommendList),
                });
            } else {
                console.warn(responseData.err);
            }
        }.bind(this));
    }
    
    _renderRow(rowData) {
        return (
            <View>
                <TouchableHighlight underlayColor='#cecece' onPress={()=>{this.openContent({'title':rowData.title, 'url':rowData.url});}}>
                    <View style={styles.row}>
                        <View style={{flex:1, alignItems:'stretch', marginRight:5}}>
                            <Image source={{uri: rowData.pic_url}} resizeMode='stretch' style={{height:60}}/>
                        </View>
                        <View style={{flex:3,justifyContent:'flex-start'}}>
                            <Text style={{fontSize:18, color:'#343434', marginBottom:3}} numberOfLines={1}>{rowData.title}</Text>
                            <Text style={{fontSize:14, color:'#666666', marginTop:3}} numberOfLines={2}>{rowData.title}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
    
    openList(name, list) {
        this.props.navigator.push({
            component: NewsList,
            title: name,
            list: list,
        });
    }
    
    openContent(data) {
        this.props.navigator.push({
            component: News,
            name:'',
            title:data.title,
            list: [],
            url:data.url,
        });
    }
    
    openPhoneList() {
        this.props.navigator.push({
            component: PhoneList,
            name: 'PhoneList'
        });
    }
    
    openSignPage() {
        this.props.navigator.push({
            component: SignIn,
            name: 'SignIn'
        });
    }
    
    render() {
        let images = carousel.map((value, i) => {
            return (
                <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center',width: Dimensions.get('window').width}} key={i} title={<Text numberOfLines={1} style={{position: 'absolute', bottom: 32, fontWeight: 'bold', fontSize: 30 / 2, color: 'white'}}>{value.title}</Text>} onPress={() => {this.openContent({'title':value.title, 'url':value.url});}}>
                    <Image source={{uri: value.pic_url}} resizeMode='stretch' style={{height:Dimensions.get('window').height*0.73/2.8,width: Dimensions.get('window').width}}/>
                </TouchableOpacity>
            );
        });
        let texts = tipsList.map((value, i) => {
            return (
                <TouchableOpacity style={{width:Dimensions.get('window').width*2.5/3.4,paddingTop: (PixelRatio.get() == 2 || Platform.OS == 'android') ? 10 : 16}} key={i} onPress={() => {Alert.alert('温馨提示',value.title, [{text:'确定'}]);}}>
                    <Text style={{fontSize: 15, color:'#666666', backgroundColor:'transparent'}} numberOfLines={1}>{value.title}</Text>
                </TouchableOpacity>
            );
        });
        return (
        <View style={styles.container}>
            <View style={styles.top_container}>
                <Swiper height={Dimensions.get('window').height*0.73/2.8} horizontal={true} autoplay={true} autoplayTimeout={3} dotColor={'#adb3bc'} activeDotColor={'#ff5559'} paginationStyle={{bottom:5, left: null, right: 10}}>
                    {images}
                </Swiper>
            </View>
            <View style={styles.middle_container}>
                <View style={styles.middle_top_container}>
                    <TouchableHighlight style={styles.middle_top_left_container} underlayColor='#cecece' onPress={()=>{this.openList('公告', this.state.notice);}}>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <Image source={require('../img/home/notice@2x.png')} style={{width:20,height:20,marginRight:8}}/>
                            <Text style={{fontSize: 16, color:'#666666'}}>公告</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.middle_top_right_container} underlayColor='#cecece' onPress={()=>{this.openSignPage();}}>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <Image source={require('../img/home/sign@2x.png')} style={{width:20,height:20,marginRight:8}}/>
                            <Text style={{fontSize: 16, color:'#666666'}}>签到</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.middle_middle_container}>
                    <TouchableHighlight style={{flex:1, justifyContent:'center', alignItems:'center'}} underlayColor='#cecece' onPress={()=>{this.openContent({'title':'东管头简介', 'url':this.state.profile});}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Image source={require('../img/home/brief@2x.png')} style={{width:20,height:20,marginBottom:5}}/>
                            <Text style={{fontSize: 14, color:'#666666'}}>简介</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={{flex:1, justifyContent:'center', alignItems:'center'}} underlayColor='#cecece' onPress={()=>{this.openContent({'title':'村容村貌', 'url':this.state.village});}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Image source={require('../img/home/village@2x.png')} style={{width:20,height:20,marginBottom:5}}/>
                            <Text style={{fontSize: 14, color:'#666666'}}>村容村貌</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={{flex:1, justifyContent:'center', alignItems:'center'}} underlayColor='#cecece' onPress={()=>{this.openList('社区医疗', this.state.hospital);}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Image source={require('../img/home/hospital@2x.png')} style={{width:20,height:20,marginBottom:5}}/>
                            <Text style={{fontSize: 14, color:'#666666'}}>社区医疗</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={{flex:1, justifyContent:'center', alignItems:'center'}} underlayColor='#cecece' onPress={()=>{this.openList('办事指南', this.state.guide);}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Image source={require('../img/home/guide@2x.png')} style={{width:20,height:20,marginBottom:5}}/>
                            <Text style={{fontSize: 14, color:'#666666'}}>办事指南</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={{flex:1, justifyContent:'center', alignItems:'center'}} underlayColor='#cecece' onPress={()=>{this.openPhoneList();}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Image source={require('../img/home/fhone@2x.png')} style={{width:20,height:20,marginBottom:5}}/>
                            <Text style={{fontSize: 14, color:'#666666'}}>电话黄页</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                
            </View>
            <View style={styles.bottom_container}>
                <View style={{width:Dimensions.get('window').width - 30, marginTop:10, paddingBottom:3}}>
                    <Text style={{fontSize:15,color:'#666666'}}>为您推荐</Text>
                </View>

                <ListView
                style={{width:Dimensions.get('window').width - 30,height:'100%'}}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                      />
                    }
                    contentContainerStyle={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                />
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
    top_container: {
        flex: 0.8,
        width: Dimensions.get('window').width,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    middle_container: {
        flex: 0.8,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middle_top_container: {
        flex: 0.9,
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        backgroundColor: 'white',
        marginBottom: 5,
    },
    middle_top_left_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        borderRightColor: '#dddddd',
        borderRightWidth:1,
        borderStyle:'solid',
    },
    middle_top_right_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        borderStyle:'solid',
    },
    middle_middle_container: {
        flex: 1.5,
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        backgroundColor: 'white',
        marginBottom: 5,
    },
    middle_bottom_container: {
        flex: 0.9,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 5,
    },
    middle_bottom_content_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottom_container: {
        flex: 1.2,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    list: {
        width: Dimensions.get('window').width - 30,
    
    },
    row: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'stretch',
        borderTopWidth:1,
        borderTopColor:'#dddddd',
        borderStyle:'solid',
        paddingTop:8,
        paddingBottom:5,
    },
});

module.exports = HOME;