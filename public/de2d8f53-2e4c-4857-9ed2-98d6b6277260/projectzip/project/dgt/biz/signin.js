/**
* 东管头村APP
* @author nectar
* Mon Jan 09 10:34:10 CST 2017
*/
'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, TextInput, Dimensions, Image, Alert, Platform, Navigator, ListView, ScrollView } from 'react-native';
import Calendar from '../components/calendar';
import Rule from './rule';
import Rank from './rank';
import moment from 'moment';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: client.userInfo.userSignTotal,
            continuation: client.userInfo.userSignContinue,
            mark: client.userInfo.userScore,
            signList: [],
            signEnable: false,
            signText: '签到',
            today: '',
        };
    }
    
    componentWillMount() {
        var firstDate = new Date();
        firstDate.setDate(1);
        var endDate = new Date(firstDate);
        endDate.setMonth(firstDate.getMonth()+1);
        endDate.setDate(0);
        client.checkSign(client.userInfo.userId, moment(firstDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), function(result) {
            if(result.success == true) {
                var flag = 1;
                result.data.forEach((data) => {
                    if(data.date == moment().format('YYYY-MM-DD')) {
                        flag = 0;
                        this.setState({signList: result.data, signEnable: false, signText:'已签到', today: new Date(result.timestamp)});
                    }
                });
                if(flag) {
                    this.setState({signList: result.data, signEnable: true, signText:'签到', today: new Date(result.timestamp)});
                }
            } else {
                console.log(result.err);
            }
        }.bind(this));
    }
    
    sign() {
        if(this.state.signEnable == false) {
            Alert.alert('今日已签到！', '今日已签到！', [{text:'确定'},{text:'取消'}]);
        } else {
            client.sign(client.userInfo.userId, function(result) {
                if(result.success == true) {
                    var list = this.state.signList;
                    list.push({date:moment().format('YYYY-MM-DD')});
                    this.setState({signList: list, total: result.data.sign_all, continuation: result.data.sign_continue, mark: result.data.score, signEnable: false, signText:'已签到'});
                    client.userInfo.userScore = result.data.score;
                    client.userInfo.userSignTotal = result.data.sign_all;
                    client.userInfo.userSignContinue = result.data.sign_continue;
                    Alert.alert('', '签到成功！', [{text:'确定'}]);
                } else {
                    console.log(result.err);
                }
            }.bind(this));
        }
    }
    
    openRulePage() {
        this.props.navigator.push({
            component: Rule,
            name: 'Rule'
        });
    }
    
    openRankPage() {
        this.props.navigator.push({
            component: Rank,
            name: 'Rank'
        });
    }
    
    onDateSelect(date) {
        var flag = 1;
        this.state.signList.forEach((value) => {
            if(value.date == moment(date).format('YYYY-MM-DD')) {
                flag = 0;
            }
        });
        if(new Date(date).getTime() < new Date().getTime() && (new Date().getTime() - new Date(date).getTime() > 24*3600*1000) && flag) {
            Alert.alert("","不支持补签", [{text:'确定'}]);
        } else if(new Date(date).getTime() > new Date().getTime()) {
            Alert.alert("","不允许提前签", [{text:'确定'}]);
        }
    }
    
    onSwipeNext() {
        
    }
    
    onSwipePrev() {
        
    }
    
    onTouchNext() {
        
    }
    
    onTouchPrev() {
        
    }
    
    renderScene(route, navigator) {
		return (
			<View style={styles.container}>
                <View style={styles.topContainer}>
                    <Image source={require('../img/sign/banner01@2x.png')} resizeMode='stretch' style={styles.bgImage} />
                </View>
                <View style={styles.middleContainer}>
                    <View style={styles.middle_left_container}>
                        <TouchableOpacity style={styles.button} onPress={() => {this.openRankPage();}}>
                            <Image source={require('../img/sign/Points-ranking@2x.png')} style={styles.rankImage} />
                            <Text style={styles.rankText}>积分榜</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.middle_center_container}>
                        <View style={styles.title_container}>
                            <Text numberOfLines={1} style={styles.totleText}>{'累计签到'}</Text>
                            <Text numberOfLines={1} style={[styles.totleText,{color:'#ff5559', fontSize: 36 / 2, marginBottom: 1}]}>{this.state.total}</Text>
                            <Text numberOfLines={1} style={styles.totleText}>{'天'}</Text>
                        </View>
                        <View style={styles.continuation_container}>
                            <Text numberOfLines={1} style={styles.continuationText}>{'连续签到'}</Text>
                            <Text numberOfLines={1} style={[styles.continuationText,{color:'#ff5559', fontSize: 36 / 2, marginBottom: 1}]}>{this.state.continuation}</Text>
                            <Text numberOfLines={1} style={styles.continuationText}>{'天'}</Text>
                        </View>
                        <View style={styles.mark_container}>
                            <Image source={require('../img/sign/integral@2x.png')} style={styles.markImage}/>
                            <View style={styles.mark_container2}>
                                <Text numberOfLines={1} style={[styles.markText,{color: '#ff5559', fontSize: 36 / 2, marginBottom: 1}]}>{this.state.mark}</Text>
                                <Text numberOfLines={1} style={styles.markText}>{'积分'}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.middle_right_container}>
                        <TouchableOpacity style={styles.button} onPress={() => {this.sign();}}>
                            <Image source={require('../img/sign/Check-in@2x.png')} style={styles.signImage} />
                            <Text style={styles.signText}>{this.state.signText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.bottomContainer}>
                    <Calendar
                      customStyle={{calendarContainer: {backgroundColor: '#f5f5f5',},title: {flex: 1,textAlign: 'center',fontSize: 15,margin: 5,color: '#333'},day: {fontSize: 15, textAlign: 'center'},dayHeading:{flex: 1,fontSize: 14,textAlign: 'center',marginVertical: 5,},weekendHeading:{flex: 1,fontSize: 14,textAlign: 'center',marginVertical: 5,color: '#cccccc',}}} // Customize any pre-defined styles
                      dayHeadings={['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']}               // Default: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
//                      eventDates={['2017-02-01']}       // Optional array of moment() parseable dates that will show an event indicator
                      events={this.state.signList}// Optional array of event objects with a date property and custom styles for the event indicator
                      monthNames={['1','2','3','4','5','6','7','8','9','10','11','12']}                // Defaults to english names of months
                      nextButtonText={'下月'}           // Text for next button. Default: 'Next'
                      onDateSelect={(date) => this.onDateSelect(date)} // Callback after date selection
                      onSwipeNext={this.onSwipeNext}    // Callback for forward swipe event
                      onSwipePrev={this.onSwipePrev}    // Callback for back swipe event
                      onTouchNext={this.onTouchNext}    // Callback for next touch event
                      onTouchPrev={this.onTouchPrev}    // Callback for prev touch event
                      prevButtonText={'上月'}           // Text for previous button. Default: 'Prev'
                      scrollEnabled={false}              // False disables swiping. Default: False
                      selectedDate={this.state.today}       // Day to be selected
                      showControls={false}               // False hides prev/next buttons. Default: False
                      showEventIndicators={true}        // False hides event indicators. Default:False
//                      startDate={new Date()}          // The first month that will display. Default: current month
                      titleFormat={'YYYY年 M月'}         // Format for displaying current month. Default: 'MMMM YYYY'
                      today={this.state.today}              // Defaults to today
                      weekStart={0} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
                    />
                </ScrollView>
            </View>
		);
	}
    
    renderNavTitle(route, navigator) {
		return (
			<Text style={styles.navBarTitleText}>
			    签到
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
		var title = "规则";
		
		return (
			<TouchableOpacity
			    onPress={() => this.openRulePage()}
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
				initialRoute={{title:'签到'}}
			/>
		);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:Platform.OS == 'ios' ? 64 : 56,
        backgroundColor: '#f5f5f5',
    },
    navigator: {
		flex:1,
		justifyContent: 'center',
		alignItems: 'stretch',
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
	    flex: 1,
	    flexDirection: 'row',
		paddingRight: 10,
		alignItems: 'center',
	},
	backImage: {
	    width: 23 / 2,
	    height: 41 / 2,
	    marginRight: 5,
	},
	topContainer: {
	    flex: 0.5,
	    width: Dimensions.get('window').width,
	},
	middleContainer: {
	    flex: 0.4,
	    flexDirection: 'row',
	},
	middle_left_container: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	},
	middle_center_container: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	},
	middle_right_container: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	},
	bottomContainer: {
	    flex: 1,
	},
	bgImage: {
	    flex: 1,
        width: Dimensions.get('window').width,
	},
	rankImage: {
	    width: 22,
	    height: 22
	},
	signImage: {
	    width: 26,
	    height: 22,
	},
	rankText: {
	    fontSize: 36 / 2,
	    color: '#f96d06',
	    marginLeft: 5,
	},
	signText: {
	    fontSize: 36 / 2,
	    color: '#ff5559',
	    marginLeft: 5,
	},
	button: {
	    flex:1,
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	},
	title_container: {
	    flexDirection: 'row',
	    marginBottom:4,
	    justifyContent: 'center',
	    alignItems: 'center',
	},
	continuation_container: {
	    flexDirection: 'row',
	    marginBottom:4,
	    justifyContent: 'flex-end',
	    alignItems: 'center',
	},
	mark_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mark_container2: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
	    alignItems: 'center',
        position:'absolute',
        right: Platform.OS == 'ios' ? 4 : 5,
        top: Platform.OS == 'ios' ? 4 : 3,
    },
    totleText: {
        color:'#666',
        fontSize:34 / 2,
    },
    continuationText: {
        color:'#666',
        fontSize:30 / 2,
    },
    markImage: {
        width:111,
        height:30,
    },
    markText: {
        color:'#666',
        fontSize:30 / 2,
    }
});