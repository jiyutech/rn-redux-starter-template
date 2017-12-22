import React from 'react'
import { TextInput } from 'react-native';

export default ( props ) => {
  let mixedProps = {...props}
  if ( mixedProps.underlineColorAndroid === undefined ) mixedProps.underlineColorAndroid = 'transparent'
  return (
    <TextInput {...mixedProps} />
  );
};
