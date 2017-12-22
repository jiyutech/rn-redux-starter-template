import React from 'react'
import { Image } from 'react-native';
import resources from '../../config/resources.js'
import { NavigationActions } from 'react-navigation';
import { Touchable } from '../Base'

export default ({ navigation, onPress }) => {
  return (
    <Touchable onPress={() =>{ onPress && onPress() }} style={{
      // 加大可点击区域，方便用户点击
      width:64,
      paddingLeft: 20,
    }}>
      <Image source={resources.plusIcon} style={[{width:44,height:44, }]} />
    </Touchable>
  );
};
