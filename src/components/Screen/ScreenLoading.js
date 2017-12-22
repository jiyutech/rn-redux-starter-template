import React from 'react'
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import resources from '../../config/resources.js'
import { NavigationActions } from 'react-navigation';

class ScreenLoading extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      rotateValue: new Animated.Value(0),
    }
  }

  startAnimation() {
    if ( this.state.visible ) {
      this.state.rotateValue.setValue(0);
      Animated.timing(this.state.rotateValue, {
        toValue: 1,
        duration: 700,
        easing: Easing.linear
      }).start(() => this.startAnimation());
    }
  }

  componentWillReceiveProps(nextProps){
    if ( nextProps.visible != this.state.visible ) {
      this.setState({
        visible: nextProps.visible
      })
      if ( nextProps.visible ) setTimeout(()=>{ this.startAnimation() }, 5)
    }
  }

  componentDidMount(){
    this.startAnimation()
  }

  render(){
    return (
      <View style={[styles.loadingMask, this.state.visible ? null : styles.hidden]}>
        <View style={styles.spinnerContainer}>
          <Animated.Image style={[styles.spinner, {
            transform: [{
              rotate: this.state.rotateValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              })
            }]
          }]} source={resources.spinnerIcon} />
        </View>
      </View>
    )
  }
}

export default ScreenLoading;

const styles = StyleSheet.create({
  loadingMask: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hidden: {
    height: 0,
    width: 0,
    overflow: 'hidden',
  },

  spinnerContainer: {
  	width: 85,
  	height: 85,
  	borderRadius: 12,
  	backgroundColor: "#ffffff",
    marginBottom: 30,
    // marginBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
  	width: 43,
  	height: 43,
    transform: [{
      rotate: '30deg'
    }]
  },
})
