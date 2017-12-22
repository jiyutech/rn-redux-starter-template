import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, take, all, race, select, fork } from 'redux-saga/effects'
import SplashScreen from 'react-native-splash-screen'
import globalTips from '../../utils/globalTips'
// import mcFetcher from '../../services/fetchers/mc'
import { NavigationActions } from 'react-navigation'
import { serviceErrorHandler } from '../../common/mcSagaUtils.js'
import { Platform } from 'react-native';

const fetchEnvInfo = function* ({ payload } = {}) {
  // let {
  //   version,
  //   projectId,
  // } = yield select(({ app, mch }) => ({
  //   version: app.version,
  //   projectId: mch.projectId,
  // }));
  //
  // // 检查当前版本是否是 App Store 待审核版本（仅对iOS生效）
  // if ( Platform.OS === 'ios' ) {
  //   const { success, data, errorMessage, errorCode } = yield call(mcFetcher, '/retail/check_appstore', {
  //     version: version,
  //     project: projectId,
  //   });
  //   // 即使接口出错也继续
  //   yield put({ type: 'app/ENV_UPDATE_FINISHED', payload: {
  //     isAudittingVersion: (data || {}).err === 7005,
  //   } })
  // }
  // else {
  //   yield put({ type: 'app/ENV_UPDATE_FINISHED', payload: {
  //     isAudittingVersion: false,
  //   } })
  // }
}

const autoHideToast = function*(){
  const {action, wait} = yield race({
    action: take('app/TOAST'),
    wait: call(delay, 2000)
  });
  if ( !action ) {
    yield put({ type: 'app/HIDE_TOAST' })
  }
}

export default [ function* () {
  // yield fork(fetchEnvInfo)
  yield all([
    take('persist/REHYDRATE'),
    // take('CHECK_LOGIN_FINISHED'),
    // take('app/ENV_UPDATE_FINISHED'),
  ])
  SplashScreen.hide()
  yield put({ type: 'app/HIDE_LOADING'})
}, function* () {
  yield takeEvery('app/TOAST', autoHideToast)
} ]
