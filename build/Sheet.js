"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sheet {
    constructor(sourceFn) {
        this.source = sourceFn;
        this.result = {};
    }
    calc(globalVars, constants, activeIndex) {
        this.clearResult();
        this.calcStyles(globalVars, constants, activeIndex);
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
                        // length is checked to allow undefined to set as styleValue
                        if (activeIndex >= styleValue.length) {
                            const selectedValue = styleValue[styleValue.length - 1];
                            styles[styleKey] = selectedValue;
                        }
                        else {
                            const selectedValue = styleValue[activeIndex];
                            styles[styleKey] = selectedValue;
                        }
                    }
                });
                // @ts-ignore
                this.result[key] = styles;
            });
        }
    }
}
exports.default = Sheet;
