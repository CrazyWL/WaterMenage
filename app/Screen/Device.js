import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  ProgressBarAndroid,
} from 'react-native';

import { StackNavigator, TabNavigator, DrawerNavigator,NavigationActions } from 'react-navigation';


import TitleBar from '../Component/TitleBar.js';
import CommonLoadingView from '../Component/CommonLoadingView';
import ListItemDivider from '../Component/ListItemDivider.js';

var { width, height} = Dimensions.get('window');

class Divider extends Component {
    static navigationOptions={
      tabBarLabel:'管家',
      tabBarIcon:({tintColor,focused}) => {
        if(focused){
          return (<Image style={[styles.tabIcon,{tintColor:tintColor}]} source={require('../../image/tab_butler_pressed.png')} />
        )}
        return (<Image style={[styles.tabIcon,{tintColor:tintColor}]} source={require('../../image/tab_butler_normal.png')} />)
        },

    }
    constructor(props) {
      super(props);
    
      this.state = {
        loadingState:1,
        deviceData:null,
        partsData:null,
        citysTds:null,
      };
    }
    getContacts(){
        const deviceUrl = 'https://cloud.shui.cn/wechat/api/device?method=info&source=yijia&deviceid='+ this.props.navigation.state.params.url;
        console.log(deviceUrl);
        fetch(deviceUrl).then((res)=>res.json())
        .then((json)=>{
            this.setState({
                loadingState:2,
                deviceData:json.data,
                citysTds:json.data.citylist,
                partsData:json.data.keeper.list,
            })
            console.log(json.data);
            console.log(json.data.keeper.list);
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
        return (
          <View style={styles.container}>
            <TitleBar navigation={this.props.navigation} title='设备列表' />
            <View style={styles.content}>
              <CommonLoadingView hintText={"正在获取设备数据..."}/>
            </View>
          </View>
        );
      }
    renderSuccessView() {
      const {deviceData} = this.state;
      const {goBack,navigate} = this.props.navigation;
      const urlPic = 'http://www.shui.cn';
        return (
          <View style={styles.container}>
            <ScrollView>
            <ImageBackground
              source={{uri:deviceData.theme?deviceData.theme.smallpic:'../../image/rent_online.png'}}
              style={{width:width,height:height-80}} resizeMode='cover'>
              <View style={styles.setGroup}>
                  <TouchableOpacity onPress={()=>navigate('HomeStack')}>
                    <Image style={styles.icon} source={require('../../image/back_icon.png')} />
                  </TouchableOpacity>
                  <Text style={{fontSize:18,color:'#fff'}}>{deviceData.name}</Text>
                  <View style={styles.icon} />
              </View>
              <View style={styles.row}>
                <View style={styles.rows}>
                  <Image source={require('../../image/pos.png')} style={styles.icon}/>
                  <Text style={styles.address}>{deviceData.address}</Text>
                </View>
                <View style={styles.rows}>
                  <Text style={styles.address}>{deviceData.lastupdated}</Text>
                </View>
              </View>
              <View style={styles.tds}>
                <Text style={styles.tdsTxt}>TDS值<Text style={styles.tdsTxtSmall}>(PPM)</Text></Text>
              </View>
              <View style={styles.tdsMain}>
                <View style={styles.tdsNumView}>
                  <Text style={styles.tdsNum}>{deviceData.tds}</Text>
                </View>
                <View style={styles.tdsTabCon}>
                  <View style={styles.tdsInfo}>
                    <Text style={styles.tdsInfoTitle}>已用天数(D)</Text>
                    <Text style={styles.tdsInfoDate}>{deviceData.runday}</Text>
                  </View>
                  <View style={styles.tdsInfo}>
                    <Text style={styles.tdsInfoTitle}>今日用水量(L)</Text>
                    <Text style={styles.tdsInfoDate}>{deviceData.tdsLevel}</Text>
                  </View>
                  <View style={styles.tdsInfo}>
                    <Text style={styles.tdsInfoTitle}>总用水量(L)</Text>
                    <Text style={styles.tdsInfoDate}>{deviceData.watergage?deviceData.watergage:0}</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
            <View style={styles.parts}>
              <View style={styles.partsMain}>
                <View style={styles.partsTitle}>
                  <Text style={styles.partsTitleText}>滤芯寿命</Text>
                </View>
                <FlatList
                  data={this.state.partsData}
                  renderItem={this._renderItem}
                  keyExtractor={this._keyExtractor}
                />
              </View>
              <View style={styles.partsTitle}>
                <Text style={styles.partsTitleText}>云净产品推荐</Text>
              </View>
              <View style={styles.productCon}>
                <View style={styles.productItems}>
                  <Image source={{uri:urlPic+deviceData.yunlist[0].smallthumb}} style={styles.productIcon} />
                  <View style={styles.productInfo}>
                    <Text style={styles.productTitle}>{deviceData.yunlist[0].smalltitle}</Text>
                    <Text style={styles.productPrice}>￥{deviceData.yunlist[0].price_users_c}/月</Text>
                  </View>
                </View>
                <View style={styles.productItems}>
                  <Image source={{uri:urlPic+deviceData.yunlist[1].smallthumb}} style={styles.productIcon} />
                  <View style={styles.productInfo}>
                    <Text style={styles.productTitle}>{deviceData.yunlist[1].smalltitle}</Text>
                    <Text style={styles.productPrice}>￥{deviceData.yunlist[1].price_users_c}/月</Text>
                  </View>
                </View>
              </View>
              <View style={styles.partsTitle}>
                <View><Text style={styles.partsTitleText}>室外环境数据</Text></View>
                <View style={styles.outdoorAddress}>
                  <Image source={require('../../image/pos_icon.png')} style={styles.icon}/>
                  <Text style={styles.outdoorAddressColor}>{deviceData.outData?deviceData.outData.name:'室外'}</Text>
                </View>
              </View>
              <View style={styles.outDoor}>
                <View style={styles.outDoorItems}>
                  <View style={styles.pm25Top}>
                    <Image style={styles.pm25Icon} source={require('../../image/pm2.5.png')} />
                    <Text>良</Text>
                  </View>
                  <View style={styles.pm25Bottom}>
                    <Text style={styles.pm25}>
                      {deviceData.outData?deviceData.outData.aqi.pm25:0}
                      <Text style={styles.pm25s}>ug/m³</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.outDoorItems}>
                  <View style={styles.pm25Top}>
                    <Image style={styles.pm25Icon} source={require('../../image/temp.png')} />
                    <Text>炎热</Text>
                  </View>
                  <View style={styles.pm25Bottom}>
                    <Text style={styles.pm25}>
                      {deviceData.outData?(deviceData.outData.weather?deviceData.outData.weather.temp:0):0}
                      <Text style={styles.pm25s}>℃</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.outDoorItems}>
                  <View style={styles.pm25Top}>
                    <Image style={styles.pm25Icon} source={require('../../image/humidity.png')} />
                    <Text>偏湿</Text>
                  </View>
                  <View style={styles.pm25Bottom}>
                    <Text style={styles.pm25}>
                      {deviceData.outData?(deviceData.outData.weather?deviceData.outData.weather.humidity:0):0}
                      <Text style={styles.pm25s}>%</Text>
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.partsTitle}>
                <View><Text style={styles.partsTitleText}>周边城市水质数据</Text></View>
              </View>
              <FlatList
                data={this.state.citysTds}
                renderItem={this._renderCitysTds}
                keyExtractor={this._keyExtractor}
                horizontal={false}
                numColumns={3}
                columnWrapperStyle={{flexDirection:'row',justifyContent: 'space-around',backgroundColor:'#fff'}}
                //style={styles.citysTds}
              />
            </View>
            </ScrollView>
          </View>
        );
    }
    _keyExtractor = (item,index) => index;
    _renderCitysTds = (data) => {
      const citysTds = parseInt(data.item.tds);
       return (
            <View style={styles.citysItems}>
              <View style={styles.center}><Text style={styles.citysName}>{data.item.name}</Text></View>
              <View style={styles.center}><Text style={styles.citysTdsNum}>{citysTds}</Text></View>
              <View style={styles.desc}>
                <Text style={styles.tdsdesc}>{data.item.tdsdesc}</Text>
              </View>
            </View>
      )
    };
    _renderItem = (data) => {
      const url = 'http://cloud.shui.cn/wechat/images/pics/';
      const len = data.item.per.length;
      const numString = data.item.per.substring(0,len-1);
      let num = parseFloat(numString)/100*250;
      layout=(e)=>{
        let progressWidth = e.layout.width;
         var b = num*progressWidth;
        //return b;
      };
      //onLayout={({nativeEvent:e})=>layout(e)}
      return (
          <TouchableOpacity activeOpacity={0.6}>
            <View key={data.index} style={styles.partsItems}>
              <Image style={styles.partsIcon} source={{uri:url+data.item.pic}} />
              <View style={styles.partsCon}>
                <View style={styles.partsConTop}>
                  <View><Text style={styles.partsName}>{data.item.name}</Text></View>
                  <View><Text style={styles.partsbackdate}>上次更换:{data.item.backdate}</Text></View>
                </View>
                <View style={styles.partsConVer}>
                  <View style={{backgroundColor:'#ccc',height:15,borderRadius:8}} onLayout={({nativeEvent:e})=>layout(e)}>
                    <View style={{backgroundColor:'#47a3ff',height:15,width:num,borderTopLeftRadius:15,borderBottomLeftRadius:15}}></View>
                  </View>
                </View>
                <View style={styles.partsConBottom}>
                  <Text style={styles.partsdas}>离更换日期 <Text style={styles.blue}>{data.item.days}</Text> 天(预计)</Text>
                </View>
              </View>

            </View>
          </TouchableOpacity>
      );
    };

    layout=(e)=>{
      let progressWidth = e.layout.width;
      console.log(progressWidth);
    };
    renderErrorView() {
        return (
          <View>
            <Text>Error</Text>
          </View>
        );
    }
}
class Mine extends Component{
  static navigationOptions={
    tabBarLabel:'我的',
    tabBarIcon:({tintColor,focused}) => {
      if(focused){
        return (<Image style={[styles.tabIcon,{tintColor:tintColor}]} source={require('../../image/tab_mine_pressed.png')} />
      )}
      return (<Image style={[styles.tabIcon,{tintColor:tintColor}]} source={require('../../image/tab_mine_normal.png')} />)
      },

  }
  render(){
    return <View><Text>Mine</Text></View>;
  }
}

const TabBar = TabNavigator({
    Manage: {screen: Divider,},
    My: {screen: Mine,},
},{
  tabBarPosition:'bottom',
  tabBarOptions:{
    activeTintColor:'#47a3ff',
    inactiveTintColor:'#666',
    showIcon:true,
    swipeEnabled:false,
    style:{backgroundColor:'#F5FCFF',height:55,borderTopWidth:1,borderColor:'#ccc',},
    labelStyle:{marginTop:4,},
    indicatorStyle:{height:0,},
  }
});

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#e8e8e8',
  },
  row:{flexDirection:'row',padding:15,justifyContent:'space-between'},
  rows:{flexDirection:'row',},
  content: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    backgroundColor:'#F5FCFF'
  },
  setGroup:{flexDirection:'row',justifyContent: 'space-between',height:50,paddingHorizontal:15,paddingVertical:16},
  icon:{width:12,height:18,marginRight:8,},
  address:{color:'#fff',fontSize:16,},
  tds:{justifyContent:'center',alignItems:'center',marginTop:20,},
  tdsTxt:{fontSize:16,color:'#fff'},
  tdsTxtSmall:{fontSize:12,color:'#fff'},
  tdsMain:{flex:1,flexDirection:'column',justifyContent: 'space-between',alignItems:'center',},
  tdsNumView:{width:width,flexDirection:'row',justifyContent: 'center',alignItems:'center',},
  tdsNum:{fontSize:100,color:'#fff'},
  tabIcon:{width:24,height:24,},
  tdsInfo:{flexDirection:'column',justifyContent: 'center',alignItems:'center'},
  tdsTabCon:{width:width,flexDirection:'row',justifyContent: 'space-around',alignItems:'center',marginBottom:30,},
  tdsInfoTitle:{color:'#fff'},
  tdsInfoDate:{color:'#fff',fontSize:40,},
  parts:{flexDirection:'column',},
  partsMain:{marginBottom:10,backgroundColor:'#fff',},
  partsTitle:{width:width,padding:15,flexDirection:'row',alignItems:'center', justifyContent: 'space-between', borderBottomWidth:1/PixelRatio.get(),borderColor:'#ccc',backgroundColor:'#fff'},
  partsTitleText:{fontSize:16,color:'#444'},
  partsIcon:{width:70,height:70,},
  productIcon:{width:width/2,height:width/2,},
  productItems:{width:width/2,justifyContent: 'center',alignItems:'center',},
  productInfo:{paddingHorizontal:10,paddingBottom:10,backgroundColor:'#fff',justifyContent: 'center',alignItems:'center',},
  partsItems:{flexDirection:'row',padding:15,borderBottomWidth:1/PixelRatio.get(),borderColor:'#ccc',},
  partsCon:{marginLeft:10,flex:1,justifyContent: 'space-between',},
  partsConTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  partsbackdate:{fontSize:12,color:'#47a3ff',},
  partsName:{fontSize:16,color:'#666',},
  partsdas:{fontSize:12,color:'#666',},
  productCon:{flexDirection:'row',marginBottom:10,},
  productTitle:{fontSize:14,paddingVertical:5,color:'#666',lineHeight:24,},
  productPrice:{color:'red',fontSize:12,},
  blue:{color:'#47a3ff'},
  outdoorAddress:{flexDirection:'row',alignItems:'center',},
  outdoorAddressColor:{color:'#666',fontSize:16,},
  outDoor:{justifyContent: 'space-around',alignItems:'center',flexDirection:'row',marginBottom:10, backgroundColor:'#fff',paddingVertical:15,},
  outDoorItems:{justifyContent: 'center',alignItems:'center'},
  pm25Top:{flexDirection:'row',justifyContent: 'center',alignItems:'center',marginBottom:10,},
  pm25Icon:{width:24,height:24,marginRight:5,},
  pm25:{fontSize:24,color:'#47a3ff'},
  pm25s:{fontSize:12,color:'#47a3ff'},
  citysTds:{flexDirection:'row',backgroundColor:'#ccc',justifyContent: 'space-around',},
  citysItems:{flexDirection:'column',backgroundColor:'#fff',margin:10,width:width/4,justifyContent: 'center',borderWidth:1,borderColor:'#6b91ce',borderRadius:5,},
  citysTdsNum:{fontSize:24,color:'#6b91ce'},
  citysName:{color:'#6b91ce',fontSize:12,},
  desc:{width:width/4,backgroundColor:'#6b91ce',flexDirection:'row',justifyContent: 'center',borderBottomLeftRadius:5,borderBottomRightRadius:5,},
  tdsdesc:{color:'#fff',fontSize:12,},
  center:{flexDirection:'row',justifyContent: 'center',padding:5,},
})
export default TabBar;