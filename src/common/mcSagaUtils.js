import { call, put, take, all, takeEvery, takeLatest, select, fork } from 'redux-saga/effects'

// 请求出错默认处理逻辑
export function* serviceErrorHandler ( errorCode, errorMessage ) {
  let { i18n } = yield select(({ i18n }) => ({
    i18n: i18n,
  }));

  if ( errorCode == -1 ) errorMessage = i18n.map['prompt_network_error'] || errorMessage
  else if ( errorCode === 6012  ) errorMessage = i18n.map['err_6012'] || errorMessage
  else if ( errorCode === 6026  ) errorMessage = states.i18n.map['err_6026'] || errorMessage

  if ( errorMessage ) yield put({type: 'app/TOAST', payload: errorMessage})
  if ( errorCode === 6011 ) yield put({ type: 'LOG_OUT', payload: { cleanData: true, reason: 'mc request returns 6011' } })
}
