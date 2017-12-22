import { call, put, all, race, take, takeEvery, takeLatest, select, fork } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import globalTips from '../../utils/globalTips'
// import mcFetcher from '../../services/fetchers/mc'
import { serviceErrorHandler } from '../../common/mcSagaUtils.js'

const thinkHowToSayHi = function* (action) {
  yield new Promise((resolve)=>{
    setTimeout(resolve, 1000)
  })
  yield put({ type: 'exampleScreenVM/SAY_HI_ASYNC_FINISHED', payload: 'Hi there, this is a screen.' })
}

const fetchSomething = function* () {
  const { key, currentLang } = yield select(({ auth, i18n }) => ({
    key: auth.key,
    currentLang: i18n.currentLang,
  }));
  const { success, data, errorMessage, errorCode } = yield call(mcFetcher, '/api_path', {
    key,
    lang: currentLang
  });
  if ( success && data ) {
    yield put({ type: 'homeVM/SET_STATE', payload: {
      resultSet: data.list
    } })
  }
  else yield call(serviceErrorHandler, errorCode, errorMessage )
}


export default [ function* () {
  yield takeEvery('exampleScreenVM/SAY_HI_ASYNC_START', thinkHowToSayHi)
} ]
