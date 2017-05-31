/**
* asd
* @author asd
* Thu Dec 29 16:33:24 CST 2016
*/
'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, View, Text } from 'react-native';
import Styles from './g_style.js'
class Header extends Component{
  componentWillMount() {
     
  }

  render() {
     return (
         <View style={Styles.header}><Text style={[Styles.font]}>{this.props.title}</Text></View>
         );
  }
}




module.exports=Header;