import type { ConstantsType, Fn, NamedStyles, StyleSheetType } from './type';

const SKIP_KEYS = ["transform", "transformMatrix"];
export default class Sheet<
  T,
  P extends NamedStyles<P> | NamedStyles<any>> {
  public result: StyleSheetType<P>;
  public source: Fn<T, P>;

  constructor(sourceFn: Fn<T, P>) {
    this.source = sourceFn;
    this.result = {} as StyleSheetType<P>;
  }

  calc(globalVars: T, constants: ConstantsType, activeIndex: number): StyleSheetType<P> {
    this.clearResult();
    this.calcStyles(globalVars, constants, activeIndex);
    return this.getResult();
  }

  getResult(): StyleSheetType<P> {
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
          if (styleValue && Array.isArray(styleValue) && !SKIP_KEYS.includes(styleKey)) {
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
}
