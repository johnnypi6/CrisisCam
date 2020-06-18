import React from 'react';
import {Dimensions, Platform} from 'react-native';

const Dimension = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  safeAreaHeight: (Platform.OS === 'android') ? 0 :
                  (Dimensions.get('window').height == 812 && Dimensions.get('window').width == 375) ||
                  (Dimensions.get('window').height == 375 && Dimensions.get('window').width == 812)? 44 : 20,
  cardHeight: 100,
  cardPadding: 12,

  titleFontSize: 13,
  bodyFontSize: 12,
  bodyUppercaseFontSize: 11,
  monkeyFontSize: 13
};

export default Dimension;