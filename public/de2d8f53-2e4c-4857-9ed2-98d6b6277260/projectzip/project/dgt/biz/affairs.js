'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, View, Text, TouchableHighlight, Dimensions } from 'react-native';

import VillageAffairs from './affairs/village_affairs';
import PartyAffairs from './affairs/party_affairs';

class AFFAIRS extends Component{
    constructor(props) {
        super(props);
        this.state = {
            btnGroup : [true, false]
        };
    }
    
  componentWillMount() {
     if(this.props.WebRoot != null && GLOBAL.WebRoot == null) {
        GLOBAL.WebRoot = this.props.WebRoot;
     }
  }
  
    renderContent(){
        if(this.state.btnGroup[0] == true){
            return (<PartyAffairs  {...this.props}></PartyAffairs>);
        }
        if(this.state.btnGroup[1] == true){
            return (<VillageAffairs  {...this.props}></VillageAffairs>);
        }      
    }
    
    showPartyaffairs(){
        this.setState({
            btnGroup: [true, false]
        });
    }    
    showVillageaffairs(){
        this.setState({
            btnGroup: [false, true]
        });
    }        

  render() {
    return (
         <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{marginTop:20, fontSize: 24, color: 'white'}}>党建村务</Text>
            </View>
            <View style={styles.tabContainer}>
                <Button text="党务党建" 
                    buttonStyle={[styles.numleftButton, this.state.btnGroup[0] ? styles.underLine : {}]} 
                    buttonTextStyle={[styles.numButtonText, this.state.btnGroup[0] ? {color: '#ff4c50'} : {}]}
                    onPress={() => {this.showPartyaffairs();}}/>
                <View style={styles.line}></View>
                <Button text="村务村政" 
                    buttonStyle={[styles.numButton, this.state.btnGroup[1] ? styles.underLine : {}]} 
                    buttonTextStyle={[styles.numButtonText, this.state.btnGroup[1] ? {color: '#ff4c50'} : {}]} 
                    onPress={() => {this.showVillageaffairs();}}/>
            </View>
            <View style={styles.contentContainer}>
                {this.renderContent()}
            </View>
        </View>
    );
  }
}    //   borderColor: 'black',
    //   borderStyle: 'solid',
    //   borderWidth: 1,

class Button extends Component {
    _handlePress() {
        if(this.props.onPress) {
            this.props.onPress();
        }
    }
    render() {
        return (
            <TouchableHighlight underlayColor={'#f47566'} onPress={this._handlePress.bind(this)}>
                <View style={this.props.buttonStyle}>
                    <Text style={this.props.buttonTextStyle}>{this.props.text}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#f5f5f5',
  },
    line:{
        height:50,
      borderColor: '#e5e5e5',
      borderStyle: 'solid',
      borderWidth: 0.5,
    },
    underLine:{
        borderBottomColor: '#ff4c50',
        borderStyle: 'solid',
        borderBottomWidth: 2,        
    },
  titleContainer:{
      height:80,
    //   marginTop:20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#ff5658',
    //   borderColor: 'black',
    //   borderStyle: 'solid',
    //   borderWidth: 1,
  },
  tabContainer:{
    flexDirection :'row',
    justifyContent: 'center',
    alignItems:'center',
    height:50,
    backgroundColor: 'white',
    // marginTop: 10,
    // marginBottom:10,      
    //   borderColor: 'black',
    //   borderStyle: 'solid',
    //   borderWidth: 1,
  },
  contentContainer:{
      flex:1,
  },
  numButton: {
      backgroundColor: 'white',
    //   borderColor: 'black',
    //   borderStyle: 'solid',
    //   borderWidth: 1,
      width: Dimensions.get('window').width / 2,
      alignItems: 'center',
      justifyContent: 'center',
      height:50, 
    //   borderTopLeftRadius: 5,
    //   borderTopRightRadius: 5,
    //   borderBottomLeftRadius: 5,
    //   borderBottomRightRadius: 5,
  },  
  numleftButton: {
      backgroundColor: 'white',
    //   borderColor: 'black',
    //   borderStyle: 'solid',
    //   borderWidth: 1,
    //   borderRightWidth: 0,
    width: Dimensions.get('window').width / 2,
      alignItems: 'center',
      justifyContent: 'center',
      height:50, 
    //   borderTopLeftRadius: 5,
    //   borderTopRightRadius: 5,
    //   borderBottomLeftRadius: 5,
    //   borderBottomRightRadius: 5,
  },   
  numButtonText: {
    //   justifyContent: 'center',
      color: '#999999',
      fontSize: 22,
  },    
});

export default AFFAIRS;