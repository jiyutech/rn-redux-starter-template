
export default function (state = {
  // 当前语言
  currentLang: 'en',
  // // 可用语言
  // langOptions: [],
  // 当前语言的语言包
  map: {
    // key: 'value'
  },
}, action) {

  switch (action.type) {

    case 'I18N_CURRENT_LANG_READY':
      return { ...state, ...action.payload }

    case 'I18N_CHANGE_LANG':
      return { ...state, ...action.payload }

    case 'I18N_CHANGE_LANG_SUCCEED':
      return { ...state, ...action.payload }

    default:
      return state
  }

}
