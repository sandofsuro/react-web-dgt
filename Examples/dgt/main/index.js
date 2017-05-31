/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
import React, { Component, PropTypes } from 'react';
import { Navigator, Text, TouchableHighlight, View, StyleSheet, BackAndroid, Alert, AsyncStorage, Linking, Platform } from 'react-native';
import Login from '../biz/login';
import Portal from '../biz/portal';
window.client = require('./client');
var Empty = require('./empty');
var packageVersion = "1.0.4";

var userNameKey = 'username';
var passwordKey = 'password';
var lastLoginTimeKey = 'lastlogintime';
var lastLoginResultKey = 'lastloginresult';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            initView: {component: Login, name: 'Login', configure: 'right'},
        };
    }
  componentWillMount() {
     if(this.props.WebRoot != null && GLOBAL.WebRoot == null) {
        GLOBAL.WebRoot = this.props.WebRoot;
     }
     AsyncStorage.getItem(lastLoginResultKey)
    .then((value3) => {
        if(value3 == 'true') {
            AsyncStorage.getItem(lastLoginTimeKey)
            .then((value4) => {
                if(new Date().getTime() - parseInt(value4) < 1000*3600*24*7 ) {
                    AsyncStorage.getItem(userNameKey)
                    .then((value1) => {
                        AsyncStorage.getItem(passwordKey)
                        .then((value2) => {
                            if(value2 != null) {
                                client.login(value1, value2, function(result) {
                                    if(result.success == true) {
                                        AsyncStorage.setItem(lastLoginResultKey, 'true');
                                        AsyncStorage.setItem(lastLoginTimeKey, (new Date().getTime()).toString());
                                        this.setState({initView: {component: Portal, name: 'Portal', configure: 'right'}, loading: false});
                                    } else {
                                        this.setState({initView: {component: Login, name: 'Login', configure: 'right'}, loading: false});
                                        Alert.alert("", result.error, [{text:'确定'}]);
                                    }
                                }.bind(this));
                            } else {
                                this.setState({initView: {component: Login, name: 'Login', configure: 'right'}, loading: false});
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    })
                    .catch((err) => {
                       console.log(err); 
                    });
                } else {
                    this.setState({initView: {component: Login, name: 'Login', configure: 'right'}, loading: false});
                }
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            this.setState({initView: {component: Login, name: 'Login', configure: 'right'}, loading: false});
        }
    })
    .catch((err) => {
        console.log(err);
    });
  }
  
  componentDidMount() {
    //   BackAndroid.addEventListener("hardwareBackPress", function() {
    //       Alert.alert("提示","是否退出应用？",[{text:'确定', onPress: ()=>{BackAndroid.exitApp();}}, {text:'取消'}]);
    //       return true;
    //   });
      
      if(Platform.OS == 'android') {
          client.getInfo(function(result){
              if(result.success == true) {
                  var version = result.data.version;
                  if(version != null && this.compareVersion(packageVersion, version) == "<") {
                      Alert.alert('','存在更新，是否下载？',[{text:'确定', onPress: ()=>{Linking.openURL(result.data.updateurl);}}, {text:'取消'}]);
                  }
              } else {
                  console.warn(result.err);
              }
          }.bind(this))
      }
  }
  
  compareVersion(oldVersion, newVersion) {
      var oldVersion_split = oldVersion.split(".");
      var newVersion_split = newVersion.split(".");
      var oldVersion_length = oldVersion_split.length;
      var newVersion_length = newVersion_split.length;
      if(oldVersion_length == newVersion_length) {
          for(var i=0;i<oldVersion_length;i++) {
              if(parseInt(oldVersion_split[i]) == parseInt(newVersion_split[i]) ) {
                  continue;
              } else if(parseInt(oldVersion_split[i]) > parseInt(newVersion_split[i])) {
                  return ">";
              } else if(parseInt(oldVersion_split[i]) < parseInt(newVersion_split[i])) {
                  return "<";
              }
          }
          return "==";
      } else if(oldVersion_length < newVersion_length) {
          for(var i=0;i<oldVersion_length;i++) {
              if(parseInt(oldVersion_split[i]) == parseInt(newVersion_split[i]) ) {
                  continue;
              } else if(parseInt(oldVersion_split[i]) > parseInt(newVersion_split[i])) {
                  return ">";
              } else if(parseInt(oldVersion_split[i]) < parseInt(newVersion_split[i])) {
                  return "<";
              }
          }
          return "<";
      } else if(newVersion_length < oldVersion_length) {
          for(var i=0;i<newVersion_length;i++) {
              if(parseInt(oldVersion_split[i]) == parseInt(newVersion_split[i]) ) {
                  continue;
              } else if(parseInt(oldVersion_split[i]) > parseInt(newVersion_split[i])) {
                  return ">";
              } else if(parseInt(oldVersion_split[i]) < parseInt(newVersion_split[i])) {
                  return "<";
              }
          }
          return ">";
      }
  }
  
  renderScene(route, navigator) {
    let Component = route.component;
    _navigator = navigator;
    return (
      <Component navigator={navigator} route={route} />
    );
  }

  configureScene(route, routeStack) {
    // return Navigator.SceneConfigs.PushFromRight;
    let configure = Navigator.SceneConfigs.PushFromRight;
    switch(route.configure){
        case 'left':
            configure = Navigator.SceneConfigs.FloatFromLeft;
            break;
        case 'bottom':
            configure = Navigator.SceneConfigs.FloatFromBottom;
            break;
        case 'right':
            configure = Navigator.SceneConfigs.FloatFromRight;
            break;
    }
    return {
        ...configure,
        gestures:{}//或者改成null
    };
  }

  render() {
      return (
          <View style={{flex:1}}>
             
            <Navigator
                ref={(ref)=>{window.navigator=ref}}
              style={styles.navigator}
              configureScene={this.configureScene}
              renderScene={this.renderScene}        
              initialRoute={this.state.initView}
            />  
             <Empty />    
          </View>
        )
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },  
});

module.exports=MainPage;