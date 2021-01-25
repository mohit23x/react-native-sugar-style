import { StyleSheet } from 'react-native';
import type { S, Fn } from './type';

export default class Sheet<T> {
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

  clearResult():void {
    Object.keys(this.result).forEach((key: string) => delete this.result[key]);
  }

  calcStyles():void {
    // let restyle = typeof this.source === "function" ? this.source(this.globalVars) : this.source;
    if (this.globalVars) {
      const restyle = this.source(this.globalVars);

      Object.keys(restyle).forEach((key) => {
        const styles = restyle[key];
        if (styles && typeof styles === 'object') {
          this.calcStyle(key, styles);
        } else {
          this.result[key] = styles;
        }
      });
    }
  }

  calcStyle(key:string, styleProps:any):void {
      this.nativeSheet[key] = styleProps;
  }

  calcNative():void {
    if (Object.keys(this.nativeSheet).length) {
      const rnStyleSheet = StyleSheet.create(this.nativeSheet);
      Object.assign(this.result, rnStyleSheet);
    }
  }
}
