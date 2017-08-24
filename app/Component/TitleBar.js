import React, { Component } from 'react';
import MenuPopWindow from './PopupWindow.js';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
  Modal,
} from 'react-native';

var { width, height } = Dimensions.get('window');
//var global = require('../utils/global.js');

export default class TitleBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPop: false,
    }
  }
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.titleBar}>
              <TouchableOpacity onPress={this.handleOpenDrawer}><Image style={styles.titleMenu} source={require('../../image/menu.png')} /></TouchableOpacity>
              <Text style={styles.title}>{this.props.title}</Text>
              <TouchableOpacity onPress={this.handleAddClick}><Image style={styles.titleMenu} source={require('../../image/add_white.png')} /></TouchableOpacity>
          </View>
          <View style={{ position: 'absolute', top: 0, left: 0, width: width, height: height}}>
            <MenuPopWindow
              width={110}
              height={90}
              show={this.state.showPop}
              closeModal={(show) => { this.setState({ showPop: show }) }}
              menuIcons={[require('../../image/scan.png'), require('../../image/qun.png')]}
              menuTexts={['新增设备', '创建组群']}
              navigation={this.props.navigation}
              />
          </View>
        </View>
    );
  }
  handleOpenDrawer = () => {
    this.props.navigation.navigate('DrawerOpen');
  };
  handleAddClick = () => {
    this.setState({showPop: !this.state.showPop});
  };

}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent:'space-between',
      height: 50,
      backgroundColor:'pink'
    },
    titleBar:{
      padding:15,
      width: width,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      backgroundColor:'#47a3ff',
    },
    titleMenu:{
      width:20,
      height:20,
    },
    title:{
      fontSize:18,
      color:'#fff',
    },
});
