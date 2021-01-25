"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderView = void 0;
const React = require("react");
const react_native_1 = require("react-native");
const ProviderView = ({ sugar, children }) => {
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
exports.ProviderView = ProviderView;
