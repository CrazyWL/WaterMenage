import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  PixelRatio,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import ListItemDivider from '../Component/ListItemDivider.js';
import CheckBox from '../Component/CheckBox.js';

var CheckBoxData=[];
export default class SetGroup extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        text:'',
        deviceData:null,
        checkedArr:[],
      };
      this.CheckBoxData=[];
    }
    componentDidMount(){
      this.getData()
    }
    getData(){
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
    _keyExtractor = (item,index) => index;
    renderItem = (data,rowID)=>{
      console.log(data,99999)
        return (
            <View style={styles.container}>
              <ScrollView>
                <View key={data.index} style={styles.deviceItem}>
                    <CheckBox
                       //ref={(c)=>this.initCheckBoxData(c)}
                       //label=""
                       checked={false}
                       //value={rowID}
                       onChange={(checked) => this.checkSelect(checked,data.index)}
                    />
                    <View style={styles.deviceInfo}>
                        <View style={styles.deviceAdmin}>
                          <Text>{data.item.name}({data.item.admined==0?'客人':'主人'})</Text>
                        </View>
                        <Text>MAC:{data.item.mac}</Text>
                    </View>
                </View>
                <ListItemDivider />
              </ScrollView>
            </View>
        )
    };
   /* initCheckBoxData(checkbox){
      
      if(checkbox!=null){
        CheckBoxData.push(checkbox);  
      }
      console.log(CheckBoxData,6666)
    }*/
    checkSelect(checked,id){
      console.log(checked+",,,,"+id,222);
    }
    setGroup = () => {
      //this.state.text?alert(this.state.text):alert('群组名称不能为空!')
      /*for (var i = 0; i < CheckBoxData.length; i++) {
         if(CheckBoxData[i]!=null){
           console.log(CheckBoxData[i]);
             CheckBoxData[i].onChange();
         }
      }*/
      /*if(this.state.text){
        console.log()
        this.props.navigation.navigate('DeviceGroupStack',{title:this.state.text})
      }else{
        alert('群组名称不能为空!')
      }*/
    };
    render(){
      const { navigate,goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
              <View style={styles.setGroup}>
                  <TouchableOpacity onPress={()=>goBack()}>
                    <Image style={styles.icon} source={require('../../image/back_icon.png')} />
                  </TouchableOpacity>
                  <Text style={{fontSize:18,color:'#fff'}}>创建分组</Text>
                  <View style={styles.icon} />
              </View>
                <View style={styles.inputCon}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder='填写群组名称(2~12个字)'
                    underlineColorAndroid='transparent'
                    maxLength={12}
                    autoCorrect={false}
                  />
                
              </View>
              <FlatList
                  data={this.state.deviceData}
                  renderItem={this.renderItem}
                  keyExtractor={this._keyExtractor}
              />
              <Button title='确认分组' onPress={this.setGroup} disabled={false} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
  container: {flexDirection:'column',backgroundColor: '#F5FCFF',flex:1},
  setGroup:{flexDirection:'row',justifyContent: 'space-between',height:50,backgroundColor:'#47a3ff',paddingHorizontal:15,paddingVertical:13},
  icon:{width:12,height:24,},
  input:{borderColor:'#ccc',borderWidth:1,borderRadius:5,paddingLeft:10,fontSize:16,},
  inputCon:{padding:15,marginTop:15,},

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
    iconFont:{
      color:'#fff',
      fontSize:16,
    },
})