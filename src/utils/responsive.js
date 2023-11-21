import {Dimensions, PixelRatio} from 'react-native';

import deviceInfo from 'react-native-device-info';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const referencePhone = {
  name: 'iPhone X',
  width: 375,
  height: 812,
};

const isTablet = deviceInfo.isTablet();

const widthComparedByReference = width => {
  const diff = screenWidth / referencePhone.width / (isTablet ? 1.33 : 1);

  // if you not using pt unit, you can delete convertPTtoPX
  return PixelRatio.roundToNearestPixel(width * diff);
};

const heightComparedByReference = height => {
  const diff = screenHeight / referencePhone.height;

  // if you not using pt unit, you can delete convertPTtoPX
  return PixelRatio.roundToNearestPixel(height * diff);
};

export {isTablet, widthComparedByReference, heightComparedByReference};
