import { Dimensions, Platform, StatusBar } from 'react-native';
const { height, width } = Dimensions.get('window');

/* =========== */
// code credits: https://medium.com/codespace69/reactnative-ios-android-detect-screen-notch-status-bar-device-info-dc11b8c6a6a3
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const isIPhoneX = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (width === X_WIDTH && height === X_HEIGHT) ||
      (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;

const statusBarHeight = Platform.select({
  ios: isIPhoneX() ? 44 : 20,
  android: StatusBar.currentHeight,
  default: 0,
});
/* ====== x ====== */

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

export const calculateNavBarHeight = ({
  screenHeight,
  height,
}: {
  screenHeight: number;
  height: number;
}) => {
  return screenHeight - statusBarHeight - height;
};

const navBarHeight = calculateNavBarHeight({
  screenHeight,
  height,
});

const isNavBarVisible = navBarHeight > 0;

export const calculateVisibleHeight = ({
  height,
  navBarHeight,
}: {
  height: number;
  navBarHeight: number;
}) => height - navBarHeight;

const visibleHeight = calculateVisibleHeight({ height, navBarHeight });

const os = {
  android: Platform.OS === 'android',
  ios: Platform.OS === 'ios',
  web: Platform.OS === 'web',
  windows: Platform.OS === 'windows',
} as const;

const breakPoints = {
  mobile: 480,
  tablet: 767,
  desktop: 1280,
};

export const constants = {
  height,
  width,
  screenHeight,
  screenWidth,
  statusBarHeight,
  navBarHeight,
  isNavBarVisible,
  visibleHeight,
  isIPhoneX,
  os,
  breakPoints,
} as const;
