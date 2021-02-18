import { StyleSheet } from 'react-native';
import { Fn, buildEventType, NamedStyles, ConstantsType, StyleSheetType } from './type';
import Sheet from './Sheet';
export default class Sugar<T> {
    builded: boolean;
    theme: T;
    sheets: Sheet<T>[];
    listeners: any;
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
    hairLineWidth: typeof StyleSheet.hairlineWidth;
    /**
     * WARNING: EXPERIMENTAL. Breaking changes will probably happen a lot and will
     * not be reliably announced. The whole thing might be deleted, who knows? Use
     * at your own risk.
     *
     * Sets a function to use to pre-process a style property value. This is used
     * internally to process color and transform values. You should not use this
     * unless you really know what you are doing and have exhausted other options.
     */
    setStyleAttributePreprocessor: typeof StyleSheet.setStyleAttributePreprocessor;
    /**
     * A very common pattern is to create overlays with position absolute and zero positioning,
     * so `absoluteFill` can be used for convenience and to reduce duplication of these repeated
     * styles.
     */
    absoluteFill: typeof StyleSheet.absoluteFill;
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
    absoluteFillObject: typeof StyleSheet.absoluteFillObject;
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
    flatten: typeof StyleSheet.flatten;
    constants: ConstantsType;
    activeIndex: number;
    constructor(newTheme: T);
    _refresh(): void;
    build(themeObj: T): void;
    configure(newConstants: Partial<ConstantsType>): void;
    create<P extends NamedStyles<P> | NamedStyles<any>, O extends StyleSheetType<P> | StyleSheetType<any>>(objFn: Fn<T, P>): P;
    _calculateActiveIndex(): void;
    _calcSheets(): void;
    _callListeners(event: buildEventType): void;
    subscribe(event: buildEventType, listener: () => any): void;
    _assertSubscriptionParams(event: buildEventType, listener: any): void;
}
