import React from 'react';
import PropTypes from 'prop-types';
import { InteractionManager, Linking } from 'react-native';
import { NavigationActions } from 'react-navigation';
import call from 'react-native-phone-call'
import Mailer from 'react-native-mail';
import theme from '../../common/theme'
import HeaderBtn from './HeaderBtn'
import HeaderBackBtn from './HeaderBackBtn'

class Screen extends React.Component {

  constructor(props) {
    super(props);
  }

  // Header 设置，供覆写
  // static navigationOptions = ({ navigation, screenProps }) => {
  //   const { shopcart } = screenProps;
  //   return {
  //     headerLeft: (
  //       <BackBtn navigation={navigation} />
  //     ),
  //     headerRight: (
  //       <ShopcartEntry navigation={navigation} shopcart={shopcart} />
  //     ),
  //   };
  // }

  // 默认Header设置
  static navigationDefaultOptions = {
    headerStyle: { backgroundColor: theme.headerBackgroundColor },
    headerTitleStyle: { alignSelf: 'center', color: theme.headerTitleFontColor, fontSize: theme.headerTitleFontSize, fontWeight: theme.headerTitleFontWeight },
    headerLeft: (<HeaderBtn />),
    headerRight: (<HeaderBtn />)
  }

  // 视图导航
  navigateTo = (routeName, params) => {
    this.props.navigation.dispatch(NavigationActions.navigate({ routeName: routeName, params: params || {} }))
  }

  // 视图后退
  navigateBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  /*
   * Life Circle Hooks - 视图生命周期回调
   */

  // 视图进入，准备开始动画
  beforeScreenAnimationIn (){
    // console.warn('beforeScreenAnimationIn');
  }

  // 视图进入，且动画完成
  afterScreenAnimationIn (){
    // console.warn('afterScreenAnimationIn');
  }

  // // 视图退出，准备开始动画 TODO
  // beforeScreenAnimationOut (){
  //   console.warn('beforeScreenAnimationOut');
  // }

  // 视图退出，且动画完成
  afterScreenAnimationOut (){
    // console.warn('afterScreenAnimationOut');
  }

  componentDidMount () {
    this.beforeScreenAnimationIn();
    InteractionManager.runAfterInteractions(() => {
      this.afterScreenAnimationIn();
    });
  }

  componentWillUnmount () {
    // this.beforeScreenAnimationOut(); TODO
    InteractionManager.runAfterInteractions(() => {
      this.afterScreenAnimationOut();
    });
  }

  openUrlInBrowser (url) {
    Linking.openURL(url).catch(err => {
      this.props.dispatch({
        type: 'app/TOAST',
        payload: 'it\'s not a valid URL' // TODO i18n
      })
    });
  }

  makePhoneCall ( number, options ) {
    call({
      number,
      ...options
    }).catch(()=>{
      this.props.dispatch({
        type: 'app/TOAST',
        payload: 'Unsupported' // TODO i18n
      })
    })
  }


  sendEMail ( email, options) {
    Mailer.mail({
      recipients: [email],
      ...options
    }, (error, event) => {
      this.props.dispatch({
        type: 'app/TOAST',
        payload: 'Unsupported' // TODO i18n
      })
    });
  }

}

export default Screen;
