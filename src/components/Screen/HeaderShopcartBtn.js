import React from 'react'
import { ImageBackground, Text, StyleSheet } from 'react-native';
import resources from '../../config/resources.js'
import { NavigationActions } from 'react-navigation'
import { Touchable } from '../Base'

const styles = StyleSheet.create({
  shopcartBtn: {
    width:44,
    height:44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopcartBtnText: {
    width:44,
  	fontSize: 8,
  	color: "#030303",
    paddingTop: 6,
    paddingLeft: 1,
    textAlign: 'center',
  },
  shopcartBtnTextTooMuch: {
  	fontSize: 7,
    letterSpacing: -0.5,
    paddingLeft: 2,
  }
});

export default ({ navigation }) => {
  let tooMuch = false
  let quantityCount = 0
  if ( quantityCount > 99 ) {
    quantityCount = '99+'
    tooMuch = true
  }
  return (
    <Touchable onPress={() =>{ navigation.dispatch(NavigationActions.navigate({ routeName: 'Shopcart'})) }}>
      <ImageBackground source={resources.shopcartIcon} style={styles.shopcartBtn}>
        <Text style={[styles.shopcartBtnText, tooMuch ? styles.shopcartBtnTextTooMuch : null]}>{quantityCount || ''}</Text>
      </ImageBackground>
    </Touchable>
  );
};
