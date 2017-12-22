import { call, put, take, takeEvery, takeLatest, select, fork } from 'redux-saga/effects'
import globalTips from '../../utils/globalTips'
// import * as appService from '../../services/app'
import * as DeviceInfo from 'react-native-device-info';
import { serviceErrorHandler } from '../../common/mcSagaUtils.js'

const fetchI18nMap = function* ({ payload } = {}) {
  // let { currentLang } = yield select(({ i18n }) => (i18n));
  // const { success, data, errorMessage, errorCode } = yield call(appService.fetchI18nMap, currentLang);
  // if ( success && data ) {
  //   yield put({ type: 'I18N_CHANGE_LANG_SUCCEED', payload: {
  //     currentLang: currentLang,
  //     map: data
  //   } })
  // }
  // else yield call(serviceErrorHandler, errorCode, errorMessage )
}

const checkCurrentLang = function*() {
  // let deviceLang;
  // try {
  //   deviceLang = (DeviceInfo.getDeviceLocale() || '').toLowerCase().split('-')[0]
  // } catch (e) {
  //   console.warn(e);
  // }
  // // # 默认语言逻辑
  // const availableLangs = ['de',  'en',  'es',  'fr',  'it',  'zh'];
  // if ( !availableLangs.includes(deviceLang) ) deviceLang = 'en'
  // // /
  // let { currentLang } = yield select(({ i18n }) => (i18n));
  // if ( deviceLang && deviceLang != currentLang ) {
  //   yield put({
  //     type: 'I18N_CHANGE_LANG',
  //     payload: {
  //       currentLang: deviceLang
  //     }
  //   })
  // }
  // yield put({
  //   type: 'I18N_CURRENT_LANG_READY',
  // })
}

export default [ function* () {
  let action = yield take('persist/REHYDRATE')
  yield call(checkCurrentLang)
  yield call(fetchI18nMap, action)
  yield takeLatest('I18N_CHANGE_LANG', fetchI18nMap)
} ]
