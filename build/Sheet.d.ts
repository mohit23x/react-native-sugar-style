import type { ConstantsType, Fn, NamedStyles, StyleSheetType } from './type';
export default class Sheet<T, P extends NamedStyles<P> | NamedStyles<any>> {
    result: StyleSheetType<P>;
    source: Fn<T, P>;
    constructor(sourceFn: Fn<T, P>);
    calc(globalVars: T, constants: ConstantsType, activeIndex: number): StyleSheetType<P>;
    getResult(): StyleSheetType<P>;
    clearResult(): void;
    calcStyles(globalVars: T, constants: ConstantsType, activeIndex: number): void;
}
