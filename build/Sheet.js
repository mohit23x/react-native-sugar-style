"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
class Sheet {
    constructor(sourceFn) {
        this.nativeSheet = {};
        this.source = sourceFn;
        this.result = {};
    }
    calc(globalVars, constants, activeIndex) {
        this.clearResult();
        this.calcStyles(globalVars, constants, activeIndex);
        this.calcNative();
        return this.getResult();
    }
    getResult() {
        return this.result;
    }
    clearResult() {
        // @ts-ignore
        Object.keys(this.result).forEach((key) => delete this.result[key]);
    }
    calcStyles(globalVars, constants, activeIndex) {
        if (globalVars) {
            const restyle = this.source(globalVars, constants);
            Object.keys(restyle).forEach((key) => {
                // @ts-ignore
                const styles = restyle[key];
                Object.keys(styles).forEach((styleKey) => {
                    const styleValue = styles[styleKey];
                    if (styleValue && Array.isArray(styleValue)) {
                        const selectedValue = styleValue[activeIndex] || styleValue[styleValue.length - 1];
                        styles[styleKey] = selectedValue;
                    }
                });
                // @ts-ignore
                this.result[key] = styles;
            });
        }
    }
    calcStyle(key, styleProps) {
        // @ts-ignore
        this.nativeSheet[key] = styleProps;
    }
    calcNative() {
        if (Object.keys(this.result).length) {
            const rnStyleSheet = react_native_1.StyleSheet.create(this.nativeSheet);
            Object.assign(this.result, rnStyleSheet);
        }
    }
}
exports.default = Sheet;
