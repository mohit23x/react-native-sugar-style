"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
class Sheet {
    constructor(sourceFn) {
        this.nativeSheet = {};
        this.source = sourceFn;
        this.globalVars = null;
        this.result = {};
    }
    calc(globalVars) {
        this.globalVars = globalVars;
        this.clearResult();
        this.calcStyles();
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
    calcStyles() {
        if (this.globalVars) {
            const restyle = this.source(this.globalVars);
            Object.keys(restyle).forEach((key) => {
                // @ts-ignore
                const styles = restyle[key];
                if (styles && typeof styles === 'object') {
                    this.calcStyle(key, styles);
                }
                else {
                    // @ts-ignore
                    this.result[key] = styles;
                }
            });
        }
    }
    calcStyle(key, styleProps) {
        // @ts-ignore
        this.nativeSheet[key] = styleProps;
    }
    calcNative() {
        if (Object.keys(this.nativeSheet).length) {
            const rnStyleSheet = react_native_1.StyleSheet.create(this.nativeSheet);
            Object.assign(this.result, rnStyleSheet);
        }
    }
}
exports.default = Sheet;
