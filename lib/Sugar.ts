import { StyleSheet } from 'react-native';
import type { S, Fn } from './type';
import Sheet from './Sheet';

const BUILD_EVENT = 'build' as const;

export default class Sugar<T> {
  public builded: boolean;
  public theme: T;
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

  constructor(newTheme: T) {
    this.builded = true;
    this.sheets = [];
    this.listeners = [];
    this.theme = newTheme;
    // proxy to original
    this.hairLineWidth = StyleSheet.hairlineWidth;
    this.absoluteFill = StyleSheet.absoluteFill;
    this.absoluteFillObject = StyleSheet.absoluteFillObject;
    this.flatten = StyleSheet.flatten;
    this.setStyleAttributePreprocessor =
      StyleSheet.setStyleAttributePreprocessor;
  }

  buildTheme(themeObj: T): void {
    this.theme = { ...this.theme, ...themeObj } as T;
    this.builded = true;
    this._calcSheets();
    this._callListeners(BUILD_EVENT);
  }

  create(objFn: Fn<T, S> | S): S {
    if (typeof objFn === 'function') {
      const sheet = new Sheet(objFn);
      this.sheets.push(sheet);
      if (this.builded) {
        sheet.calc(this.theme);
      }
      return sheet.getResult();
    }
    return objFn;
  }

  _calcSheets(): void {
    this.sheets.forEach((sheet) => sheet.calc(this.theme));
  }

  // extra methods
  _callListeners(event: typeof BUILD_EVENT): void {
    if (Array.isArray(this.listeners[event])) {
      this.listeners[event].forEach((listener:any) => listener());
    }
  }

  subscribe(event: typeof BUILD_EVENT, listener: () => any): void {
    this._assertSubscriptionParams(event, listener);
    this.listeners[BUILD_EVENT] = this.listeners[BUILD_EVENT] || [];
    this.listeners[BUILD_EVENT].push(listener);
    if (this.builded) {
      listener();
    }
  }

  _assertSubscriptionParams(event:typeof BUILD_EVENT, listener:any) {
    if (event !== BUILD_EVENT) {
      throw new Error(`Only '${BUILD_EVENT}' event is currently supported.`);
    }
    if (typeof listener !== 'function') {
      throw new Error('Listener should be a function.');
    }
  }
}
