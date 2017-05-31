import React, { Component } from 'react';
import {View,StyleSheet,WebView,Navigator,Text,TouchableOpacity,Image,Dimensions,Platform,ScrollView} from 'react-native';
import Header from '../biz/g_header';
let detail={
    title:'新闻',
    url:'http://www.baidu.com'
}
export default class News extends Component{
       constructor(props) {
        super(props);
        if(this.props.route){
             this.props.title = this.props.route.title;
             this.props.url = this.props.route.url;
         }
         if(this.props.title == null) {
            this.props.title = detail.title;
        }
          if(this.props.url == null) {
            this.props.url = detail.url;
        }
        this.state = {
            title:this.props.route.title,
            url:this.props.route.url
        };
    }
     componentWillMount() {
         
    }
   
         
    renderNavTitle(route, navigator) {
		return (
		    <Text style={styles.navBarTitleText}>
				详情
			</Text>
		);
	}
	
	renderNavLeftButton(route, navigator) {
	    var title = "返回";
	    
		return (
			<TouchableOpacity
				onPress={() => this.props.navigator.pop()}
				style={styles.navBarLeftButton}>
				<Image source={require('../img/register/Arrow@2x.png')} style={styles.backImage} />
				<Text style={styles.navBarButtonText}>
					{title}
				</Text>
			</TouchableOpacity>
		);
	}
	
	renderNavRightButton(route, navigator) {
		var title = "";
		
		return (
			<TouchableOpacity
				style={styles.navBarRightButton}>
				<Text style={styles.navBarButtonText}>
					{title}
				</Text>
			</TouchableOpacity>
		);
	}
    
    render() {
        var bar = (
			<Navigator.NavigationBar
				routeMapper={{
					LeftButton:this.renderNavLeftButton.bind(this),
					RightButton:this.renderNavRightButton.bind(this),
					Title:this.renderNavTitle.bind(this),
				}}
				style={styles.navBar}
			/>
		);
		return (
			<Navigator style={styles.navigator}
				navigationBar={bar}
				renderScene={this.renderScene.bind(this)}
				initialRoute={{title:this.state.title}}
			/>
		);
    
    }
    renderScene() {
     return (
        
         <View style={styles.container}>
			 <ScrollView style={styles.inner}  automaticallyAdjustContentInsets={false}
        horizontal={true}>
		<iframe style={styles.inner} src={this.state.url}/>
           </ScrollView>
        </View>
         );
         
  }
}

 /*<WebView
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: this.state.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
          scalesPageToFit={true}
        />*/
	 /*export class WebView extends React.Component {

    loadIFrame = () => {
        this.refs.iframe.srcdoc = this.props.source.html ;
        }

    render () {
        setTimeout(this.loadIFrame) ;
        return (
            <iframe ref="iframe" style={{ height: '100%', width: '100%', border: 0, seamless
            </iframe>
            ) ;
        }
    }*/
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop:Platform.OS == 'ios' ? 62 : 56
  },
   inner: {
    flex: 1,
    backgroundColor: '#F5FCFF',
	overflow:'auto'
  },
   navigator: {
		flex:1,
		justifyContent: 'center',
		alignItems: 'stretch',
		overflow:'auto'
	},
	navBar: {
		backgroundColor: '#ff5558',
		justifyContent: 'center',
	},
	navBarTitleText: {
		fontSize:20,
		fontWeight: '400',
		marginVertical: 12,
		width: 3 * (Dimensions.get('window').width) / 5,
		textAlign: 'center',
		color: '#ffffff',
	},
	navBarButtonText: {
		fontSize:15,
		color: '#ffffff',
	},
	navBarLeftButton: {
	    flex: 1,
	    flexDirection: 'row',
		paddingLeft: 10,
		alignItems: 'center',
	},
	navBarRightButton: {
		paddingRight: 10,
		justifyContent: 'center',
	},
	backImage: {
	    width: 23 / 2,
	    height: 41 / 2,
	    marginRight: 5,
	},
    webView:{
      
     }
})
