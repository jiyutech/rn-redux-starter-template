import config from '../../config'
import _ from 'lodash'

export default function (state = {

  version: config.version,
  build: config.build,
  isAudittingVersion: false,

  // 安卓后退键是否可用
  androidHardwareBackPressEnabled: true,

  // 全局Loading
  isLoading: true,
  // 全局Toast
  isToasting: false,
  toastingText: '',
  // 全局Prompt
  isPrompting: false,
  promptOptions: {
    title: '', //  (string, required) -- The title text of the prompt
    onCancel: ()=>{}, // (function, required) -- Function that is called when user cancels prompt
    onSubmit: ()=>{}, // (function, required) -- Function that is called with user's value when they submit
  },
  promptDefaultOptions: {
    title: '', //  (string, required) -- The title text of the prompt
    placeholder: '', // (string) -- The placeholder text of the prompt
    defaultValue: '', // (string) -- The default value of the prompt
    onCancel: ()=>{}, // (function, required) -- Function that is called when user cancels prompt
    onSubmit: ()=>{}, // (function, required) -- Function that is called with user's value when they submit
    submitText: 'Confirm', // (string) -- The string that is displayed on the submit button (defaults to "OK")
    cancelText: 'Cancel', // (string) -- The string that is displayed on the cancel button (defaults to "Cancel")
    onChangeText: ()=>{}, // (function) -- Function that is called with user input when it changes.
    textInputProps: {}, // (Object) -- Additional props on the input element
  },

}, action) {
  switch (action.type) {

    case 'app/ENV_UPDATE_FINISHED':
      return { ...state, ...action.payload }

    case 'app/SHOW_LOADING':
      state.isLoading = true
      return { ...state }

    case 'app/HIDE_LOADING':
      state.isLoading = false
      return { ...state }

    case 'app/TOAST':
      state.isToasting = true
      state.toastingText = action.payload
      return { ...state }

    case 'app/HIDE_TOAST':
      state.isToasting = false
      state.toastingText = ''
      return { ...state }

    case 'app/SHOW_PROMPT':
      state.promptOptions = _.assign({}, state.promptDefaultOptions, action.payload)
      state.isPrompting = true
      return { ...state }

    case 'app/HIDE_PROMPT':
      state.isPrompting = false
      return { ...state }

    case 'app/ENABLE_ANDROID_HWBACKBTN':
      state.androidHardwareBackPressEnabled = true
      return { ...state }

    case 'app/DISABLED_ANDROID_HWBACKBTN':
      state.androidHardwareBackPressEnabled = false
      return { ...state }

    default:
      return state
  }

}
