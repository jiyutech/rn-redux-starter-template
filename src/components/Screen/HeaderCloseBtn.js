import React from 'react'
import { Image } from 'react-native';
import resources from '../../config/resources.js'
import { NavigationActions } from 'react-navigation';
import { Touchable } from '../Base'

export default ({ navigation, onPress }) => {
  return (
    <Touchable onPress={() =>{ onPress ? onPress() : navigation.dispatch(NavigationActions.back()) }}>
      <Image source={resources.closeIcon} style={[{width:44,height:44, }]} />
    </Touchable>
  );
};
