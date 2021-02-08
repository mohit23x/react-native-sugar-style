"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sugar_1 = require("./Sugar");
const Provider_1 = require("./Provider");
class Main {
    init(theme) {
        const StyleSheet = new Sugar_1.default(theme);
        const { ThemeContext, ThemeProvider, useTheme, withTheme } = Provider_1.themeCreator(StyleSheet, theme);
        return { StyleSheet, ThemeContext, ThemeProvider, useTheme, withTheme };
    }
}
exports.default = Main;
