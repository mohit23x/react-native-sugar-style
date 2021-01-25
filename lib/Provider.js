"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SugarProvider = void 0;
const React = require("react");
const react_native_1 = require("react-native");
const SugarProvider = ({ sugar, children }) => {
    const [count, render] = React.useState(1);
    React.useEffect(() => {
        sugar.subscribe("build", () => {
            render(c => c + 1);
        });
    }, []);
    return (<react_native_1.View key={count} style={{ flex: 1 }}>
            {children}
        </react_native_1.View>);
};
exports.SugarProvider = SugarProvider;
