import { StyleSheet } from 'react-native';
import type {  Fn, NamedStyles } from './type';

export default class Sheet<T, S extends NamedStyles<S> | NamedStyles<any>> {
  public result: S;
  public source: Fn<T, S>;
  public nativeSheet: S = {} as S;
  public globalVars: T | null;

  constructor(sourceFn: Fn<T, S>) {
    this.source = sourceFn;
    this.globalVars = null;
    this.result = {} as S;
  }

  calc(globalVars: T): S {
    this.globalVars = globalVars;
    this.clearResult();
    this.calcStyles();
    this.calcNative();
    return this.getResult();
  }

  getResult(): S {
    return this.result;
  }

  clearResult(): void {
    // @ts-ignore
    Object.keys(this.result).forEach((key: string) => delete this.result[key]);
  }

  calcStyles():void {
    if (this.globalVars) {
      const restyle = this.source(this.globalVars);

      Object.keys(restyle).forEach((key) => {
        // @ts-ignore
        const styles = restyle[key];
        if (styles && typeof styles === 'object') {
          this.calcStyle(key, styles);
        } else {
          // @ts-ignore
          this.result[key] = styles;
        }
      });
    }
  }

  calcStyle(key: string, styleProps: any): void {
    // @ts-ignore
      this.nativeSheet[key] = styleProps;
  }

  calcNative():void {
    if (Object.keys(this.nativeSheet).length) {
      const rnStyleSheet = StyleSheet.create(this.nativeSheet);
      Object.assign(this.result, rnStyleSheet);
    }
  }
}
