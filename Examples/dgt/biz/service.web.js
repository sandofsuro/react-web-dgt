/**
* asd
* @author asd
* Thu Dec 29 16:33:24 CST 2016
*/
'use strict';

import React, { Component } from 'react';
import { AppRegistry,Dimensions, StyleSheet, Image, View, Text ,TouchableHighlight,Linking } from 'react-native';
import Header from './g_header';
import Styles from './g_style.js';
//import Barcode from './barcode';
import PhoneList from './phone_list';
let services=[
    // {id:1,title:'二维码',img:'ewm@2x.png',width:48, height: 48, link:'page.barcode'},
    {id:2,title:'天气',img:'tq@2x.png',width:53, height: 48, link:'https://tianqi.moji.com/weather/china/beijing/fengtai-district'},
    {id:3,title:'违章查询',img:'wz@2x.png',width:49, height: 48,link:'http://www.autohome.com.cn/violation/'},
    {id:4,title:'老黄历',img:'hl@2x.png',width:62, height: 48,link:'http://yun.rili.cn/wnl/index.html'},
    // {id:5,title:'列车时刻',img:'hc@2x.png',width:42, height: 48,link:'http://liecheshike.51240.com/'},
    {id:6,title:'邮编查询',img:'yb@2x.png',width:62, height: 48,link:'http://youbian.51240.com/'},
    {id:7,title:'快递查询',img:'kd@2x.png',width:49, height: 48,link:'http://www.guoguo-app.com/'},
    // {id:8,title:'药品查询',img:'yp@2x.png',width:62, height: 48,link:'http://yaopin.51240.com/'}
    {id:9,title:'货币换算',img:'hb@2x.png',width:49, height: 47,link:'http://huobiduihuan.51240.com/'},
    {id:10,title:'油耗计算',img:'yh@2x.png',width:35, height: 47,link:'http://qicheyouhao.51240.com/'},
    // {id:11,title:'财经信息',img:'cj@2x.png',width:56, height: 44,link:'http://q.stock.sohu.com/'}
    ];
class Service extends Component{
  componentWillMount() {
     if(this.props.WebRoot != null && GLOBAL.WebRoot == null) {
        GLOBAL.WebRoot = this.props.WebRoot;
     }
  }

    _onPressButton(link){
          if(!link)return;
           var strs=link.split(".");
           if(strs[0] == 'page'){
              // navigator.push({  
              //      component: Barcode,
              //        name:'Barcode'});
              
           }else{
                Linking.openURL(link);
           }
    }
    renderServices(){
        var count=100;
        var result = [];
        for(var i=0,len=services.length;i<len;i+=4){
           result.push(services.slice(i,i+4));
        }
        var serviceView = result.map((row)=>{
           var rowView= row.map((s)=>{
               return(  <TouchableHighlight underlayColor={'#CCCCCC'} key={s.id} style={styles.rowItem}  onPress={()=>{this._onPressButton(s.link)}}>
              
                <View style={{alignItems: 'center',}}>
                <Image source={require('../img/service/' + s.img)} style={{width:s.width / 2,height:s.height / 2,marginBottom:3}}/>
               <Text style={styles.title}>{s.title}</Text>
               </View>
               
               </TouchableHighlight>);
           });
           count++;
            return (<View key={count}><View style={styles.row}>
           {rowView}
           
            </View><View style={styles.sep}></View></View>);
        });
        return serviceView;
    }
  render() {
     return (
         <View style={styles.container}>
         <Header style={styles.header} title='便民服务'/>
        {this.renderServices()}
         </View>
         );
  }
}
let rowItemWidth =  (Dimensions.get('window').width - 50)/4;
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  
    row:{
        flexDirection: 'row',
        height:120,
        paddingLeft:25,
        paddingRight:25,
    },
    rowItem:{
        
       width:rowItemWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
  title: {
    paddingTop:20,
    color:'#999999',
    fontSize:13,
  },
  
  sep:{
      flex: 1,
      height:1,
      backgroundColor:'#e5e5e5'
  }
});


module.exports=Service;