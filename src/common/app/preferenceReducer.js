import config from '../../config'

export default function (state = {

  // 调试模式
  isDebugMode: false,

}, action) {
  switch (action.type) {

    case 'appPreference/SET_STATE':
      return { ...state, ...action.payload }

    case 'appPreference/TOGGLE_DEBUG_MODE':
      state.isDebugMode = !state.isDebugMode
      return { ...state }

    default:
      return state

  }

}
