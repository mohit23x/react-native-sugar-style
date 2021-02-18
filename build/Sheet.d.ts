import type { ConstantsType, Fn, NamedStyles, StyleSheetType } from './type';
export default class Sheet<T, S extends NamedStyles<S> | NamedStyles<any>, O extends StyleSheetType<O> | StyleSheetType<any>> {
    result: O;
    source: Fn<T, S>;
    nativeSheet: O;
    constructor(sourceFn: Fn<T, S>);
    calc(globalVars: T, constants: ConstantsType, activeIndex: number): O;
    getResult(): O;
    clearResult(): void;
    calcStyles(globalVars: T, constants: ConstantsType, activeIndex: number): void;
    calcStyle(key: string, styleProps: any): void;
    calcNative(): void;
}
