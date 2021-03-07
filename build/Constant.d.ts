export declare const calculateNavBarHeight: ({ screenHeight, height, }: {
    screenHeight: number;
    height: number;
}) => number;
export declare const calculateVisibleHeight: ({ height, navBarHeight, }: {
    height: number;
    navBarHeight: number;
}) => number;
export declare const constants: {
    readonly height: number;
    readonly width: number;
    readonly screenHeight: number;
    readonly screenWidth: number;
    readonly statusBarHeight: number;
    readonly navBarHeight: number;
    readonly isNavBarVisible: boolean;
    readonly visibleHeight: number;
    readonly platform: {
        readonly android: boolean;
        readonly ios: boolean;
        readonly web: boolean;
        readonly windows: boolean;
        readonly isPad: boolean;
        readonly isTv: boolean;
        readonly isIPhoneX: () => boolean;
    };
    readonly breakPoints: {
        mobile: number;
        tablet: number;
        desktop: number;
    };
};
