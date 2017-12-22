import React from 'react'
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import resources from '../../config/resources.js'
import { NavigationActions } from 'react-navigation';

class Toast extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      text: '',
      opacity: new Animated.Value(0),
    }
  }
  //
  // hideAnimation() {
  //   if ( this.state.visible ) {
  //     this.state.rotateValue.setValue(0);
  //     Animated.timing(this.state.rotateValue, {
  //       toValue: 1,
  //       duration: 700,
  //       easing: Easing.linear
  //     }).start(() => this.startAnimation());
  //   }
  // }
  //
  componentWillReceiveProps(nextProps){
    this.setState({
      visible: nextProps.visible,
      text: nextProps.text
    })
  }
  //
  // componentDidMount(){
  //   this.startAnimation()
  // }

  render(){
    return (
      <View style={[styles.overlay, this.state.visible ? null : styles.hidden]}>
        <View style={styles.textWrapper}>
          <Text>{this.state.text || ''}</Text>
        </View>
      </View>
    )
  }
}

export default Toast;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hidden: {
    height: 0,
    width: 0,
    overflow: 'hidden',
  },

  textWrapper: {
  	paddingTop: 12,
    paddingBottom: 15,
    paddingHorizontal: 18,
  	borderRadius: 12,
  	backgroundColor: "#ffffff",
    marginBottom: 30,
    // marginBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '70%',
  },
  text: {
  	fontSize: 14,
  	lineHeight: 16,
  	textAlign: "center",
  	color: "#030303"
  },
})
