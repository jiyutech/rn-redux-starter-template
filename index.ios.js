import { AppRegistry, AppState } from 'react-native';
import App from './App';
AppRegistry.registerComponent('TheRNAPP', () => App);

// // 清空Badge
// import JPushModule from 'jpush-react-native'
// AppState.addEventListener('change', ( appState )=>{
//   if ( appState === 'active' ) {
//     JPushModule.setBadge(0, (success) => {
//       console.log(success)
//     });
//   }
// });
