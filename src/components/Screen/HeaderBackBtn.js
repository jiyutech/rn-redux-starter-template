import React from 'react'
import { Image } from 'react-native';
import resources from '../../config/resources.js'
import { NavigationActions } from 'react-navigation';
import { Touchable } from '../Base'

export default ({ navigation, onPress }) => {
  return (
    <Touchable onPress={() =>{ onPress ? onPress() : navigation.dispatch(NavigationActions.back()) }} style={{
      // 加大可点击区域，方便用户点击
      width:64,
      paddingRight: 20,
    }}>
      <Image source={resources.backIcon} style={[{width:44,height:44, }]} />
    </Touchable>
  );
};
