import type { Fn, NamedStyles } from './type';
export default class Sheet<T, S extends NamedStyles<S> | NamedStyles<any>> {
    result: S;
    source: Fn<T, S>;
    nativeSheet: S;
    globalVars: T | null;
    constructor(sourceFn: Fn<T, S>);
    calc(globalVars: T): S;
    getResult(): S;
    clearResult(): void;
    calcStyles(): void;
    calcStyle(key: string, styleProps: any): void;
    calcNative(): void;
}
