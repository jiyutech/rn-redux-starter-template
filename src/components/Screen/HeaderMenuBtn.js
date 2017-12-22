import React from 'react'
import { Image } from 'react-native'
import { NavigationActions } from 'react-navigation'
import resources from '../../config/resources.js'
import { Touchable } from '../Base'

var available = true

export default ({ navigation }) => {
  return (
    <Touchable onPress={() =>{
      if ( available ) {
        available = false
        setTimeout(()=>{
          available = true
        }, 500)
        navigation.dispatch(NavigationActions.navigate({ routeName: 'Menu' }));
      }
    }}>
      <Image source={resources.burgMenuIcon} style={[{width:44,height:44, }]} />
    </Touchable>
  );
};
