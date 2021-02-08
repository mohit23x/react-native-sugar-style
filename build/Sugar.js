"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const Sheet_1 = require("./Sheet");
const BUILD_EVENT = 'build';
class Sugar {
    constructor(newTheme) {
        this.builded = true;
        this.sheets = [];
        this.listeners = [];
        this.theme = newTheme;
        // proxy to original
        this.hairLineWidth = react_native_1.StyleSheet.hairlineWidth;
        this.absoluteFill = react_native_1.StyleSheet.absoluteFill;
        this.absoluteFillObject = react_native_1.StyleSheet.absoluteFillObject;
        this.flatten = react_native_1.StyleSheet.flatten;
        this.setStyleAttributePreprocessor =
            react_native_1.StyleSheet.setStyleAttributePreprocessor;
    }
    build(themeObj) {
        this.theme = { ...this.theme, ...themeObj };
        this.builded = true;
        this._calcSheets();
        this._callListeners(BUILD_EVENT);
    }
    create(objFn) {
        if (typeof objFn === 'function') {
            const sheet = new Sheet_1.default(objFn);
            this.sheets.push(sheet);
            if (this.builded) {
                sheet.calc(this.theme);
            }
            return sheet.getResult();
        }
        return objFn;
    }
    _calcSheets() {
        this.sheets.forEach((sheet) => sheet.calc(this.theme));
    }
    // extra methods
    _callListeners(event) {
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event].forEach((listener) => listener());
        }
    }
    subscribe(event, listener) {
        this._assertSubscriptionParams(event, listener);
        this.listeners[BUILD_EVENT] = this.listeners[BUILD_EVENT] || [];
        this.listeners[BUILD_EVENT].push(listener);
        if (this.builded) {
            listener();
        }
    }
    _assertSubscriptionParams(event, listener) {
        if (event !== BUILD_EVENT) {
            throw new Error(`Only '${BUILD_EVENT}' event is currently supported.`);
        }
        if (typeof listener !== 'function') {
            throw new Error('Listener should be a function.');
        }
    }
}
exports.default = Sugar;
