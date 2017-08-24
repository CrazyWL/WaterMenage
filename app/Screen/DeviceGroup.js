import React, { Component } from 'react';
import {
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

import CommonLoadingView from '../Component/CommonLoadingView';
import ListItemDivider from '../Component/ListItemDivider.js';
import TitleBar from '../Component/TitleBar.js';

const {width,height} = Dimensions.get('window')

export default class HomePage extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        loadingState:1,
        deviceData:null,
      };
    }
    getContacts(){
        let url = 'https://cloud.shui.cn/wechat/api/device?method=lists&source=yijia&userid=65850';
        fetch(url).then((res)=>res.json())
        .then((json)=>{
            this.setState({
                loadingState:2,
                deviceData:json.data,
            })
            //console.log(json);
        }).catch((error)=>console.log(error))
    }
    render() {
        switch (this.state.loadingState) {
          case 1:
           this.getContacts();
            return this.renderLoadingView();
          case 2:
            return this.renderSuccessView();
          case 3:
            return this.renderErrorView();
          default:
        }
    }
    renderLoadingView() {
      const { navigate,state } = this.props.navigation
        return (
          <View style={styles.container}>
            <TitleBar navigation={this.props.navigation} title={state.params?state.params.title:''} />
            <View style={styles.content}>
              <CommonLoadingView hintText={"正在获取设备数据..."}/>
            </View>
          </View>
        );
      }
    renderSuccessView() {
      const { navigate,state } = this.props.navigation
        return (
          <View style={styles.container}>
            <TitleBar navigation={this.props.navigation} title={state.params?state.params.title:'默认组群名字'} />
           <FlatList
                data={this.state.deviceData}
                renderItem={this.renderItem}
                keyExtractor={this._keyExtractor}
            />
          </View>
        );
    }
    _keyExtractor = (item,index) => index;
    renderErrorView() {
      const { navigate,state } = this.props.navigation
        return (
          <View>
            <TitleBar navigation={this.props.navigation} title={state.params?state.params.title:'默认组群名字'} />
            <Text>Error</Text>
          </View>
        );
    }
    renderItem = (data)=>{
        return (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={()=>this.props.navigation.navigate('DeviceStack',{url:data.item.deviceid})}>
                <View key={data.index} style={styles.deviceItem}>
                        <Image style={styles.deviceImg} source={require('../../image/water_offline.png')} />
                        <View style={styles.deviceInfo}>
                            <View style={styles.deviceAdmin}><Text>{data.item.name}({data.item.admined==0?'客人':'主人'})</Text></View>
                            <Text>MAC:{data.item.mac}</Text>
                        </View>
                        <Image style={{width:10,height:18}} source={require('../../image/dev_next.png')}/>
                </View>
                <ListItemDivider />
            </TouchableOpacity>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#F5FCFF',
    },
    content: {
        flex: 1,
        width: width,
        flexDirection: 'row',
    },
    deviceImg:{
        width:50,
        height:50,
    },
    deviceItem:{
        padding:15,
        flexDirection:'row',
        alignItems:'center',
    },
    deviceInfo:{
        marginLeft:15,
        flex:1,
    },
    deviceAdmin:{
        paddingBottom:8,
    },
});