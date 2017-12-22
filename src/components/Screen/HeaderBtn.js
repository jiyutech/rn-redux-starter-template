import React from 'react'
import { Text } from 'react-native';
import resources from '../../config/resources.js'
import { NavigationActions } from 'react-navigation';
import { Touchable } from '../Base'

export default (props) => {
  return (
    <Touchable {...props} style={{
      height:44,
      paddingHorizontal: 12,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {props.title ? (
        <Text {...props} style={{
        	fontSize: 17,
        	fontWeight: '300',
        	color: '#000000'
        }}>{props.title}</Text>
      ) : props.children}
    </Touchable>
  );
};
