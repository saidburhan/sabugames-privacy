/**
 * features/graphs/ParametricDrawer.js  —  Parametrik Fonksiyon Çizici
 *
 * (x(t), y(t)) formatındaki parametrik denklemleri çizer.
 * adaptiveSampler modülünün collectParametricSegments yardımcısını kullanır.
 *
 * Varsayılan t aralığı [-10, 10]:
 *   Çoğu eğitim örneğini (Lissajous, sikloidal, spiral vb.) kapsar.
 *
 * Kullanım:
 *   ParametricDrawer.draw(renderer, { evaluateFn, color })
 */

import { collectParametricSegments, drawSegments } from './adaptiveSampler.js';
import { DomainRestriction } from '../../core/DomainRestriction.js';

export const ParametricDrawer = {
    /**
     * Parametrik eğriyi canvas'a çizer.
     *
     * @param {object} renderer   CanvasRenderer instance
     * @param {{ evaluateFn: (t:number) => {x,y}|null, color: string }} curve
     */
    draw(renderer, curve) {
        const { evaluateFn, color, rawEvaluateFn, domainEndpoints } = curve;

        const tMin  = curve.tMin  ?? -10;
        const tMax  = curve.tMax  ??  10;
        // Temel adım sayısı: en az 800, zoom arttıkça incelir
        const steps = Math.max(800, Math.round((tMax - tMin) * renderer.scale / 3));

        const { segments } = collectParametricSegments(
            evaluateFn, tMin, tMax, steps, renderer
        );

        drawSegments(renderer.ctx, segments, color);

        // ── Domain sınır noktası işaretleri ──────────────────────────────────
        if (domainEndpoints && rawEvaluateFn) {
            const ctx = renderer.ctx;
            for (const ep of domainEndpoints) {
                if (ep.varName !== 't') continue;
                const tVal = ep.getValue();
                if (tVal === null) continue;
                const pt = rawEvaluateFn(tVal);
                if (!pt || !isFinite(pt.x) || !isFinite(pt.y)) continue;
                DomainRestriction.tryDrawTransitionDot(
                    ctx, renderer, tVal, pt, evaluateFn, color, ep.isInclusive
                );
            }
        }
    }
};
