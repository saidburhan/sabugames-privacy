/**
 * core/SliderScope.js  —  Paylaşımlı Slider Değer Deposu
 *
 * Sorumluluklar:
 *   ✓ Tüm slider değişkenlerinin güncel değerlerini tek bir nesnede tutar.
 *   ✓ MathEngine derleme fonksiyonları bu nesneyi scope olarak kullanır.
 *   ✓ SliderManager değer değiştirdiğinde doğrudan bu nesne mutasyona uğrar.
 *
 * Kullanım:
 *   import { sliderScope, evalWithSliders } from './SliderScope.js';
 *
 *   sliderScope.a = 2;                     // slider değerini yaz
 *   const val = evalWithSliders('a+1');     // → 3
 */

/**
 * Tüm slider değişkenlerinin { varName: number } haritası.
 * MathEngine ve SliderManager bu nesneyi doğrudan okur/yazar.
 * @type {Record<string, number>}
 */
export const sliderScope = {};

/**
 * Bir ifadeyi slider değerleriyle birlikte değerlendirir.
 * Sayısal sonuç döner; hata durumunda NaN döner.
 *
 * @param {string} expr  — math.js ifadesi (örn. "2*a+1")
 * @returns {number}
 */
export function evalWithSliders(expr) {
    try {
        const result = window.math.evaluate(String(expr), sliderScope);
        if (typeof result === 'number' && isFinite(result)) return result;
        return NaN;
    } catch {
        return NaN;
    }
}
