import React from 'react';
import { AppRegistry, AsyncStorage, BackHandler, Platform } from 'react-native';
import { Root } from 'native-base';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';
import createSagaMiddleware from 'redux-saga';
import {persistStore, autoRehydrate} from 'redux-persist'

import { Touchable, ScreenLoading, Toast } from './components/Screen'
import Prompt from 'react-native-prompt'

import AppNavigator from './AppNavigator'
import commonReducers from './common/reducers';
import commonSagas from './common/sagas';
import screenReducers from './screens/reducers';
import screenSagas from './screens/sagas';
import { logger, crashReporter } from './utils/log.js'


// Reducer组装，全局+视图
const AppReducer = combineReducers({
  ...commonReducers,
  ...screenReducers
});

// Sagas组装，全局+视图
const sagas = [...commonSagas, ...screenSagas];
const sagaMiddleware = createSagaMiddleware()

// Store初始化
const store = createStore(
  AppReducer,
  undefined,
  compose(
    applyMiddleware(
      // logger,
      // crashReporter,
      sagaMiddleware
    ),
    autoRehydrate()
  )
)

// Store持久化
persistStore(store, {
  whitelist: [ 'appPreference', 'i18n', 'auth'],
  storage: AsyncStorage
})

if ( Platform.OS === 'android' ) {
  // 安卓后退行为
  BackHandler.addEventListener('hardwareBackPress', function() {
    try {
      if ( store.getState().app.androidHardwareBackPressEnabled ) store.dispatch(NavigationActions.back())
    } catch (e) { console.error(e); }
    return true;
  });
}

// Sagas初始化运行
sagas.forEach((saga)=>{
  sagaMiddleware.run(saga)
})

let ConnScreenLoading = connect(({app}) => ({app}))(({app})=>(<ScreenLoading visible={app.isLoading} />))
let ConnToast = connect(({app}) => ({app}))(({app})=>(<Toast visible={app.isToasting} text={app.toastingText} />))
let ConnPrompt = connect(({app}) => ({app}))(({app})=>(<Prompt visible={app.isPrompting} {...app.promptOptions}/>))

// Root Component
class App extends React.Component {
  store = store

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={this.store}>
        <Root>
          <AppNavigator />
          <ConnScreenLoading />
          <ConnToast />
          <ConnPrompt />
        </Root>
      </Provider>
    );
  }
}

export default App;
