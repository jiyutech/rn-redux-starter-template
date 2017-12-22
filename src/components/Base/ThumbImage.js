import React from 'react'
import { Text, Image, View, StyleSheet } from 'react-native';
import _ from 'lodash'

const styles = StyleSheet.create({
  placeholderStyle: {
    backgroundColor: '#f3f3f3'
  }
})


function wrapCallback ( props, callbackName, addonFn ){
  let staleFn = props[callbackName]
  props[callbackName] = function(){
    staleFn && staleFn();
    addonFn && addonFn();
  }
}


class ThumbImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'pending' // 'loading', 'loaded', 'error'
    };
  }

  render() {

    let props = {
      ...this.props
    };

    wrapCallback(props, 'onLoadStart', ()=>{
      this.setState({
        status: 'loading',
      })
    });

    wrapCallback(props, 'onLoad', ()=>{
      this.setState({
        status: 'loaded',
      })
    });

    wrapCallback(props, 'onError', ()=>{
      this.setState({
        status: 'error',
      })
    });

    let wrapperProp = this.state.status == 'error' ? _.assign({}, props) : {};
    wrapperProp.style = [
      this.state.status === 'loaded' ? {} : styles.placeholderStyle,
      props.style || {},
    ]

    return (
      <View {...wrapperProp}>
        {this.state.status != 'error' ? <Image {...props}/> : null}
        {this.state.status == 'error' && props.errorPlaceholder ? props.errorPlaceholder : null}
      </View>
    )
  }
}

export default ThumbImage
