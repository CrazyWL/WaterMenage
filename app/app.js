import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  PixelRatio,
  ScrollView,
} from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator,NavigationActions } from 'react-navigation';

import SetGroup from './Screen/SetGroup';
import HomePage from './Screen/HomePage';
import TabBar from './Screen/Device';
import DeviceGroup from './Screen/DeviceGroup';

const {width,height} = Dimensions.get('window')

class DrawerList extends Component{
    constructor(props) {
      super(props);
    
      this.state = {};
    }
    navigateTo(){
        this.props.navigation.navigate('DeviceGroupStack');
    }
    render(){
        const title = this.props.title;
        const num = this.props.num;
        // const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>this.navigateTo()}>
                    <View style={styles.drawerItems}>
                        <Text style={styles.font16}>{title}</Text>
                        <Text style={styles.font16}>({num})</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.line} />
            </View>
        );
    }
}
class DrawerComponent extends Component{
    constructor(props) {
      super(props);
      this.state = {};
    }
    navigateTo(){
        this.props.navigation.navigate('SetGroupStack');
    }
    render(){
        const {navigate} = this.props.navigation; 
        return (
            <View style={styles.container}>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.drawerItems} activeOpacity={0.8} onPress={()=>this.navigateTo()}>
                            <View style={styles.row}>
                                <Image style={styles.icon} source={require('../image/add_blue.png')} />
                                <Text style={styles.addItems}>创建组群</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.line} />
                    </View>
                    <View style={styles.container}>
                        <DrawerList title='全部设备' num={2} navigation={this.props.navigation} />
                        <DrawerList title='设备1' num={1} navigation={this.props.navigation}/>
                        <DrawerList title='设备2' num={2} navigation={this.props.navigation} />
                        <DrawerList title='设备3' num={1} navigation={this.props.navigation} />
                        <DrawerList title='设备4' num={2} navigation={this.props.navigation} />
                   </View>
            </View>
        );
    }
};
const DrawerSreen = DrawerNavigator({
    HomeDrawer:{screen: HomePage,},
    SetGroupStack:{screen:SetGroup},
    DeviceGroupStack:{screen:DeviceGroup},
},{
    drawerWidth:width*0.7,
    contentComponent:DrawerComponent,
});

const StackScreen =  StackNavigator({
    HomeStack: {screen:DrawerSreen},
    SetGroupStack:{screen:SetGroup},
    DeviceStack:{screen:TabBar},
    DeviceGroupStack:{screen:DeviceGroup},
},{
    headerMode:'none',
});

const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
    },
    drawerItems:{
        padding:15,
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    addItems:{
        color:'#47a3ff',
        fontSize:18,
        marginLeft:10,
    },
    icon:{
        width:20,
        height:20,
    },
    font16:{fontSize:16,},
    line:{
        width:width*0.7-20,
        marginLeft:10,
        marginRight:10,
        height:1/PixelRatio.get(),
        backgroundColor:'#d3d3d3',
    },
});

AppRegistry.registerComponent('WaterManage', () => StackScreen);