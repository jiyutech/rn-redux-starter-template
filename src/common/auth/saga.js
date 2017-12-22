import { call, put, take, takeEvery, takeLatest, select, fork } from 'redux-saga/effects'
// import mcFetcher from '../../services/fetchers/mc'
import globalTips from '../../utils/globalTips'
import { serviceErrorHandler } from '../../common/mcSagaUtils.js'


const checkLogin = function* (action) {
  // const {key, version} = yield select(({ app, auth }) => ({
  //   version: app.version,
  //   key: auth.key,
  // }));
  //
  // // 无缓存Key情况下直接弹出登录框
  // if ( !key ) {
  //   yield put({ type: 'CHECK_LOGIN_FINISHED' })
  //   yield put({ type: 'LOG_OUT', payload: { reason: 'no Key stored' } })
  //   return ;
  // }
  //
  // const { success, data, errorMessage, errorCode } = yield call(mcFetcher, '/retail/startup', {
  //   key,
  //   version
  // });
  // yield put({ type: 'CHECK_LOGIN_FINISHED' })
  // if ( success && data ) {
  //   yield put({ type: 'ENSURED_HAS_LOGGED_IN', payload: {
  //     storeInfo: data.user_info,
  //     clientInfo: data.client_info,
  //   } })
  // }
  // else yield call(serviceErrorHandler, errorCode, errorMessage )
}

const updateStartUpInfo = function* (action) {
  // const {key, version} = yield select(({ app, auth }) => ({
  //   version: app.version,
  //   key: auth.key,
  // }));
  // const { success, data, errorMessage, errorCode } = yield call(mcFetcher, '/retail/startup', {
  //   key,
  //   version
  // });
  // if ( success && data ) {
  //   yield put({ type: 'UPDATE_STARTUP_INFO_FINISHED', payload: {
  //     storeInfo: data.user_info,
  //     clientInfo: data.client_info,
  //   } })
  // }
  // else yield call(serviceErrorHandler, errorCode, errorMessage )
}

const login = function* ({ payload }) {
  // const { success, data, errorMessage, errorCode } = yield call(mcFetcher, '/retail/login', {
  //   password: payload.password
  // });
  // if ( success && data ) {
  //   yield put({ type: 'ENSURED_HAS_LOGGED_IN', payload: {
  //     key: data.key,
  //     storeInfo: data.user_info,
  //     clientInfo: data.client_info,
  //   } })
  //   yield put({ type: 'LOG_IN_SUCCEED', payload: {
  //     key: data.key,
  //     password: payload.password
  //   } })
  // }
  // else {
  //   yield put({ type: 'LOG_IN_FAILED', payload: {
  //     success, data, errorMessage, errorCode
  //   } })
  // }
}

export default [ function* () {
  yield takeLatest('persist/REHYDRATE', checkLogin)
}, function* () {
  yield takeEvery('LOG_IN_REQUEST', login)
  yield takeEvery('UPDATE_STARTUP_INFO', updateStartUpInfo)
} ]
