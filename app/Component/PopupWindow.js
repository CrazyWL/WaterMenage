import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    Modal,
    Dimensions,
    ToastAndroid,
    PixelRatio,
} from 'react-native'
const { width, height } = Dimensions.get('window');
let mwidth = 110;
let mheight = 90;
const bgColor = '#47a3ff';
const top = 60;
export default class MenuModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: this.props.show,
        }
        mwidth = this.props.width;
        mheight = this.props.height;
    }

    componentWillReceiveProps(nextProps) {
       this.setState({ isVisible: nextProps.show });
    }

    closeModal() {
        this.setState({
            isVisible: false
        });
        this.props.closeModal(false);
    }

    render() {
        var menuItems = [];
        var icons = this.props.menuIcons;
        var texts = this.props.menuTexts;
        for (var i = 0; i < icons.length; i++) {
            if(i<icons.length-1){
              menuItems.push(
                <TouchableOpacity key={i} activeOpacity={0.3} onPress={this.handlePopMenuItemClick} style={styles.itemView}>
                   <View style={{flexDirection:'row',alignItems:'center',paddingBottom:10,}}>
                        <Image style={styles.imgStyle} source={icons[i]} />
                        <Text style={styles.textStyle}>{texts[i]}</Text>
                    </View>
                    <View style={{width:mwidth-10,height:1/PixelRatio.get(),paddingLeft:5,paddingRight:5,backgroundColor:'#fff'}} />
                </TouchableOpacity>)
            }else{
                menuItems.push(
                    <TouchableOpacity style={styles.itemView} key={i} activeOpacity={0.3} onPress={()=>this.props.navigation.navigate('SetGroupStack')}>
                       <View style={{flexDirection:'row',alignItems:'center',paddingBottom:10,}}>
                            <Image style={styles.imgStyle} source={icons[i]} />
                            <Text style={styles.textStyle}>{texts[i]}</Text>
                        </View>
                    </TouchableOpacity>);
            }
        }
        return (
            <View style={styles.container}>
                <Modal
                    transparent={true}
                    visible={this.state.isVisible}
                    animationType={'fade'}
                    onRequestClose={() => {}}
                    //onRequestClose={() => this.closeModal()}
                    >
                    <TouchableOpacity style={styles.container} onPress={() => this.closeModal()}>
                        <View style={styles.modal}>
                            {menuItems}
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }

    handlePopMenuItemClick = (i) => {
      ToastAndroid.show("click item"+i, ToastAndroid.SHORT);
      this.closeModal();
    }
}
const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
    },
    modal: {
        backgroundColor: bgColor,
        width: mwidth,
        height: mheight,
        position: 'absolute',
        right:10,
        paddingTop:5,
        top: top,
        alignItems: 'center',
        opacity:.95,
    },
    itemView: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        width: mwidth,
        paddingTop: 8,
    },
    textStyle: {
        color: '#fff',
        fontSize: 15,
        marginLeft: 5,
    },
    imgStyle: {
        width: 20,
        height: 20,
        marginRight:5,
    }
});
