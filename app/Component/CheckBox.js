import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  PixelRatio,
  Dimensions,
  TouchableHighlight
} from 'react-native';


import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class CheckBox extends React.Component{
  static defaultProps = {
      checked: false
   }; 
  static propTypes={
     checked: React.PropTypes.bool,
     onChange: React.PropTypes.func,
  };
  constructor(props){
     super(props);
     this.state = {
        checked: props.checked,
     };
  }
  componentWillReceiveProps(nextProps) {
      this.setState({
        checked: nextProps.checked
      });
  }
  onChange() {
     this.setState({checked:!this.state.checked});
  }
  toggle(){
     console.log(this.state.checked,"checkbox被点击了");
     this.setState({checked:!this.state.checked});
     console.log(this.state.checked,111);
     this.props.onChange(this.state.checked);    
  }
  render() {
    var source = "";
    if(this.state.checked){
      source = "check";
    }
    var container = (
      <View style={styles.container}>
        <Icon name={source?source:null} size={16} style={styles.checkbox} color="#00B4F7" ></Icon>
      </View>
    );
    return (
      <TouchableHighlight ref="checkbox" onPress={this.toggle.bind(this)} underlayColor='white'>
        {container}
      </TouchableHighlight>
    )
  }
}
const styles = StyleSheet.create({
  checkbox:{
    padding:0,
    margin:0,
  },
  container:{
    width:26,
    height:26,
    borderColor:'#ccc',
    borderWidth:1,
    borderRadius:13,
    justifyContent:'center',
    alignItems:'center',
  }
})