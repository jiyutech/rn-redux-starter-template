import React from 'react'
import { TouchableOpacity } from 'react-native';

export default ( props ) => {
  let mixedProps = {...props}
  if ( mixedProps.activeOpacity === undefined ) mixedProps.activeOpacity = 0.6
  if ( mixedProps.delayPressIn === undefined ) mixedProps.delayPressIn = 0
  if ( mixedProps.delayPressOut === undefined ) mixedProps.delayPressIn = 0
  return (
    <TouchableOpacity {...mixedProps}>
      {props.children}
    </TouchableOpacity>
  );
};
