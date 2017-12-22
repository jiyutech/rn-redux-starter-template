import { Alert } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';

export default {

  alert: function( title = '', msg = '' ){
    Alert.alert(
      title,
      msg,
      [
        {text: 'OK'},  // TODO 多语言
      ],
      { cancelable: false }
    )
  },

  Spinner

}
