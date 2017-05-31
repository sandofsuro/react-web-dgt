/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, View, Text } from 'react-native';
import MainPage from './main';
var RCTLog = require('RCTLog');

class Nectar extends Component{
  componentWillMount() {
     if(this.props.WebRoot != null && GLOBAL.WebRoot == null) {
        GLOBAL.WebRoot = this.props.WebRoot;
     }
  }

  render() {
     return (<MainPage></MainPage>);
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    height:96,
    width:96,
  },
  title: {
    paddingTop:20,
    color:'#268FFF',
    fontSize:20,
  },
});

AppRegistry.registerComponent('Nectar', () => Nectar);