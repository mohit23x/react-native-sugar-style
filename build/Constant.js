"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
const react_native_1 = require("react-native");
const { height, width } = react_native_1.Dimensions.get('window');
/* =========== */
// code credits: https://medium.com/codespace69/reactnative-ios-android-detect-screen-notch-status-bar-device-info-dc11b8c6a6a3
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const isIPhoneX = () => react_native_1.Platform.OS === 'ios' && !react_native_1.Platform.isPad && !react_native_1.Platform.isTVOS
    ? (width === X_WIDTH && height === X_HEIGHT) ||
        (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;
const statusBarHeight = react_native_1.Platform.select({
    ios: isIPhoneX() ? 44 : 20,
    android: react_native_1.StatusBar.currentHeight,
    default: 0,
});
/* ====== x ====== */
const { height: screenHeight, width: screenWidth } = react_native_1.Dimensions.get('screen');
const navBarHeight = screenHeight - statusBarHeight - height;
const isNavBarVisible = navBarHeight > 0;
const visibleHeight = height - navBarHeight;
const os = {
    android: react_native_1.Platform.OS === 'android',
    ios: react_native_1.Platform.OS === 'ios',
    web: react_native_1.Platform.OS === 'web',
    windows: react_native_1.Platform.OS === 'windows',
};
exports.constants = {
    constant: {
        height,
        width,
        screenHeight,
        screenWidth,
        navBarHeight,
        isNavBarVisible,
        visibleHeight,
        isIPhoneX,
        os,
        statusBarHeight,
    },
};
