import { Dimensions, Platform } from 'react-native';


export function checkIsIPhoneX() {
  let dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
}

export const isIPhoneX = checkIsIPhoneX()
export const iPhoneXSafeAreaBottomSpace = 34

export function ifIPhoneX(IPhoneXStyle, regularStyle) {
  if (isIPhoneX) {
    return IPhoneXStyle;
  } else {
    return regularStyle
  }
}
