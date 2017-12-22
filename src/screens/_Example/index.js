import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View, ScrollView, Image, FlatList, RefreshControl, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import styles from './style.js'
import theme from '../../common/theme'
import resources from '../../config/resources.js'

import { Touchable, ThumbImage } from '../../components/Base'
import { Screen, HeaderBackBtn, HeaderMenuBtn, HeaderShopcartBtn } from '../../components/Screen'

class InstanceScreen extends Screen {

  constructor(props) {
    super(props);
  }

  // Header 设置
  static navigationOptions = ({ navigation, screenProps }) => {
    const { i18n, mch, shopcart } = screenProps;
    return {
      ...Screen.navigationDefaultOptions,
      title: '',
      headerLeft: (
        <HeaderMenuBtn navigation={navigation} />
      ),
      headerRight: (
        <HeaderShopcartBtn navigation={navigation} shopcart={shopcart} />
      ),
    };
  }

  // 视图进入，准备开始动画
  beforeScreenAnimationIn (){
    // console.warn('beforeScreenAnimationIn');
    // const { dispatch, navigation, auth, vm } = this.props;
    // 进入页面时带入的路由参数
    // const {params} = navigation.state;
  }

  // 视图进入，且动画完成
  afterScreenAnimationIn (){
    // console.warn('afterScreenAnimationIn');
    // const { dispatch, navigation, auth, vm } = this.props;
    // 进入页面时带入的路由参数
    // const {params} = navigation.state;
  }

  // 视图退出，且动画完成
  afterScreenAnimationOut (){
    // console.warn('afterScreenAnimationOut');
  }

  render() {
    const { dispatch, navigation, example, vm } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Example for screen scope
        </Text>
        <Text style={styles.instructions}>
          {vm.hiMessage}
        </Text>
        <Button
          onPress={() => dispatch({ type: 'exampleScreenVM/SAY_HI' })}
          title="Say Hi"
        />
        <Button
          onPress={() => dispatch({ type: 'exampleScreenVM/SAY_HI_ASYNC_START' })}
          title="Say Hi after for a while"
        />
        <Text style={styles.welcome}>
          --------------------------
        </Text>
        <Text style={styles.welcome}>
          Example for common scope
        </Text>
        <Text style={styles.instructions}>
          {example.hiMessageFromGlobal}
        </Text>
        <Button
          onPress={() => dispatch({ type: 'SAY_HI' })}
          title="Say Hi"
        />
        <Button
          onPress={() => dispatch({ type: 'SAY_HI_ASYNC_START' })}
          title="Say Hi after for a while"
        />
      </View>
    )
  }
}

export default connect(({ example, exampleScreenVM }) => ({ example, vm: exampleScreenVM }))(InstanceScreen);
