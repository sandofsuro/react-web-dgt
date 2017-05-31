'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import TabNavigator from '../react-native-tab-navigator/TabNavigator.js'; 

import Home from './home';
import Affairs from './affairs';
import Administration from './administration';
import Service from './service.web.js';
import Personal from './personal';

export default class Portal extends Component {
    constructor(props) {
        super(props);
        this.state = {
	  	      selectedTab:'Home'
	      };
    }

    render(){
    	return (
          <TabNavigator>
			  <TabNavigator.Item
			  	title="首页"
			    selected={this.state.selectedTab === 'Home'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image resizeMode='contain' source={require('../img/portal/sy@2x.png')} style={styles.iconStyle}/>}
			    renderSelectedIcon={() => <Image resizeMode='contain' source={require('../img/portal/sy-hover@2x.png')} style={styles.iconStyle}/>}
			    onPress={() => this.setState({ selectedTab: 'Home' })}>
			    <Home {...this.props}/>
			  </TabNavigator.Item>
			  <TabNavigator.Item
			  	title="党建村务"
			    selected={this.state.selectedTab === 'Affairs'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image resizeMode='contain' source={require('../img/portal/djcw@2x.png')} style={styles.iconStyle}/>}
			    renderSelectedIcon={() => <Image resizeMode='contain' source={require('../img/portal/djcw-hover@2x.png')} style={styles.iconStyle}/>}
			    onPress={() => this.setState({ selectedTab: 'Affairs' })}>
			    <Affairs {...this.props}/>
			  </TabNavigator.Item>
			   <TabNavigator.Item
			  	title="公司行政"
			    selected={this.state.selectedTab === 'Administration'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image resizeMode='contain' source={require('../img/portal/gsxz@2x.png')} style={styles.iconStyle}/>}
			    renderSelectedIcon={() => <Image resizeMode='contain' source={require('../img/portal/gsxz-hover@2x.png')} style={styles.iconStyle}/>}
			    onPress={() => this.setState({ selectedTab: 'Administration' })}>
			    <Administration {...this.props}/>
			  </TabNavigator.Item>
			  <TabNavigator.Item
			  	title="便民服务"
			    selected={this.state.selectedTab === 'Service'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image resizeMode='contain' source={require('../img/portal/bmfw@2x.png')} style={styles.iconStyle}/>}
			    renderSelectedIcon={() => <Image resizeMode='contain' source={require('../img/portal/bmfw-hover@2x.png')} style={styles.iconStyle}/>}
			    onPress={() => this.setState({ selectedTab: 'Service' })}>
			    <Service {...this.props}/>
			  </TabNavigator.Item>
			  <TabNavigator.Item
			  	title="个人中心"
			    selected={this.state.selectedTab === 'Personal'}
			    selectedTitleStyle={styles.selectedTextStyle}
			    titleStyle={styles.textStyle}
			    renderIcon={() => <Image resizeMode='contain' source={require('../img/portal/wd@2x.png')} style={styles.iconStyle}/>}
			    renderSelectedIcon={() => <Image resizeMode='contain' source={require('../img/portal/wd-hover@2x.png')} style={styles.iconStyle}/>}
			    onPress={() => this.setState({ selectedTab: 'Personal' })}>
			    <Personal {...this.props}/>
			  </TabNavigator.Item>
			</TabNavigator>
    	);
    }
}

const styles=StyleSheet.create({
   iconStyle:{
       width:24,
       height:26,
   },
   textStyle:{
       color:'#999',
   },
   selectedTextStyle:{
       color:'black',
   }
});