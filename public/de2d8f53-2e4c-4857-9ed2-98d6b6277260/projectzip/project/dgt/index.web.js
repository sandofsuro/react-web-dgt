/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, View, Text  ,Platform,} from 'react-native';
import MainPage from './main2';


class Nectar extends Component{
  componentWillMount() {
      window.GLOBAL = {};
     if(this.props.WebRoot != null && GLOBAL.WebRoot == null) {
       
     }
      window.GLOBAL.WebRoot = "http://localhost:3000/";
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
var app = document.createElement('div');
  document.body.appendChild(app);
  AppRegistry.runApplication('Nectar', {
    rootTag: app
  });