import { StyleSheet } from 'react-native';
import {
  Fn,
  buildEventType,
  NamedStyles,
  ConstantsType,
  StyleSheetType,
} from './type';
import Sheet from './Sheet';
import { constants } from './Constant';

const BUILD_EVENT = 'build' as const;

export default class Sugar<T> {
  public builded: boolean;
  public theme: T;
  // @ts-ignore
  public sheets: Sheet<T>[];
  public listeners: any;

  /**
   * This is defined as the width of a thin line on the platform. It can be
   * used as the thickness of a border or division between two elements.
   * Example:
   * ```
   *   {
   *     borderBottomColor: '#bbb',
   *     borderBottomWidth: StyleSheet.hairlineWidth
   *   }
   * ```
   *
   * This constant will always be a round number of pixels (so a line defined
   * by it look crisp) and will try to match the standard width of a thin line
   * on the underlying platform. However, you should not rely on it being a
   * constant size, because on different platforms and screen densities its
   * value may be calculated differently.
   */
  public hairLineWidth: typeof StyleSheet.hairlineWidth;

  /**
   * WARNING: EXPERIMENTAL. Breaking changes will probably happen a lot and will
   * not be reliably announced. The whole thing might be deleted, who knows? Use
   * at your own risk.
   *
   * Sets a function to use to pre-process a style property value. This is used
   * internally to process color and transform values. You should not use this
   * unless you really know what you are doing and have exhausted other options.
   */
  public setStyleAttributePreprocessor: typeof StyleSheet.setStyleAttributePreprocessor;

  /**
   * A very common pattern is to create overlays with position absolute and zero positioning,
   * so `absoluteFill` can be used for convenience and to reduce duplication of these repeated
   * styles.
   */
  public absoluteFill: typeof StyleSheet.absoluteFill;

  /**
   * Sometimes you may want `absoluteFill` but with a couple tweaks - `absoluteFillObject` can be
   * used to create a customized entry in a `StyleSheet`, e.g.:
   *
   *   const styles = StyleSheet.create({
   *     wrapper: {
   *       ...StyleSheet.absoluteFillObject,
   *       top: 10,
   *       backgroundColor: 'transparent',
   *     },
   *   });
   */
  public absoluteFillObject: typeof StyleSheet.absoluteFillObject;
  /**
   * Flattens an array of style objects, into one aggregated style object.
   * Alternatively, this method can be used to lookup IDs, returned by
   * StyleSheet.register.
   *
   * > **NOTE**: Exercise caution as abusing this can tax you in terms of
   * > optimizations.
   * >
   * > IDs enable optimizations through the bridge and memory in general. Referring
   * > to style objects directly will deprive you of these optimizations.
   *
   * Example:
   * ```
   * const styles = StyleSheet.create({
   *   listItem: {
   *     flex: 1,
   *     fontSize: 16,
   *     color: 'white'
   *   },
   *   selectedListItem: {
   *     color: 'green'
   *   }
   * });
   *
   * StyleSheet.flatten([styles.listItem, styles.selectedListItem])
   * // returns { flex: 1, fontSize: 16, color: 'green' }
   * ```
   * Alternative use:
   * ```
   * StyleSheet.flatten(styles.listItem);
   * // return { flex: 1, fontSize: 16, color: 'white' }
   * // Simply styles.listItem would return its ID (number)
   * ```
   * This method internally uses `StyleSheetRegistry.getStyleByID(style)`
   * to resolve style objects represented by IDs. Thus, an array of style
   * objects (instances of StyleSheet.create), are individually resolved to,
   * their respective objects, merged as one and then returned. This also explains
   * the alternative use.
   */
  public flatten: typeof StyleSheet.flatten;
  public constants: ConstantsType;
  public activeIndex: number;

  constructor(newTheme: T) {
    this.builded = true;
    this.sheets = [];
    this.listeners = [];
    this.theme = newTheme;

    this.hairLineWidth = StyleSheet.hairlineWidth;
    this.absoluteFill = StyleSheet.absoluteFill;
    this.absoluteFillObject = StyleSheet.absoluteFillObject;
    this.flatten = StyleSheet.flatten;
    this.setStyleAttributePreprocessor =
      StyleSheet.setStyleAttributePreprocessor;
    this.constants = constants;
    this.activeIndex = 0;
    this._calculateActiveIndex();
  }

  _refresh() {
    this.builded = true;
    this._calculateActiveIndex();
    this._calcSheets();
    this._callListeners(BUILD_EVENT);
  }

  build(themeObj: T): void {
    this.theme = { ...this.theme, ...themeObj } as T;
    this._refresh();
  }

  configure(newConstants: Partial<ConstantsType>): void {
    this.constants = { ...this.constants, ...newConstants } as ConstantsType;
    this._refresh();
  }

  create<P extends NamedStyles<P> | NamedStyles<any>>(objFn: Fn<T, P>): P {
    if (typeof objFn === 'function') {
      const sheet = new Sheet(objFn);
      this.sheets.push(sheet);
      if (this.builded) {
        sheet.calc(this.theme, this.constants, this.activeIndex);
      }
      return sheet.getResult() as P;
    }
    return objFn as P;
  }

  _calculateActiveIndex(): void {
    const breakPointValues = Object.values(this.constants.breakPoints);
    const currentWidth = this.constants.width;
    let activeIndex = 0;
    breakPointValues.forEach((value: number) => {
      if (currentWidth >= value) {
        activeIndex++;
      }
    });
    this.activeIndex = activeIndex;
  }

  _calcSheets(): void {
    this.sheets.forEach((sheet) =>
      sheet.calc(this.theme, this.constants, this.activeIndex)
    );
  }

  _callListeners(event: buildEventType): void {
    if (Array.isArray(this.listeners[event])) {
      this.listeners[event].forEach((listener: any) => listener());
    }
  }

  subscribe(event: buildEventType, listener: () => any): void {
    this._assertSubscriptionParams(event, listener);
    this.listeners[BUILD_EVENT] = this.listeners[BUILD_EVENT] || [];
    this.listeners[BUILD_EVENT].push(listener);
    if (this.builded) {
      listener();
    }
  }

  _assertSubscriptionParams(event: buildEventType, listener: any) {
    if (event !== BUILD_EVENT) {
      throw new Error(`Only '${BUILD_EVENT}' event is currently supported.`);
    }
    if (typeof listener !== 'function') {
      throw new Error('Listener should be a function.');
    }
  }
}
