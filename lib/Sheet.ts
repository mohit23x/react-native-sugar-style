import { StyleSheet } from 'react-native';
import type { ConstantsType, Fn, NamedStyles, StyleSheetType } from './type';

export default class Sheet<
  T,
  S extends NamedStyles<S> | NamedStyles<any>,
  O = S
  > {
  public result: O;
  public source: Fn<T, S>;
  public nativeSheet: O = {} as O;

  constructor(sourceFn: Fn<T, S>) {
    this.source = sourceFn;
    this.result = {} as O;
  }

  calc(globalVars: T, constants: ConstantsType, activeIndex: number): O {
    this.clearResult();
    this.calcStyles(globalVars, constants, activeIndex);
    this.calcNative();
    return this.getResult();
  }

  getResult(): O {
    return this.result;
  }

  clearResult(): void {
    // @ts-ignore
    Object.keys(this.result).forEach((key: string) => delete this.result[key]);
  }

  calcStyles(
    globalVars: T,
    constants: ConstantsType,
    activeIndex: number
  ): void {
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
            } else {
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

  calcStyle(key: string, styleProps: any): void {
    // @ts-ignore
    this.nativeSheet[key] = styleProps;
  }

  calcNative(): void {
    if (Object.keys(this.result).length) {
      const rnStyleSheet = StyleSheet.create(this.nativeSheet);
      Object.assign(this.result, rnStyleSheet);
    }
  }
}
