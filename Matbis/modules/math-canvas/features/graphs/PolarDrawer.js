/**
 * features/graphs/PolarDrawer.js  —  Polar Fonksiyon Çizici
 *
 * r = f(θ) formatındaki denklemleri çizer.
 * adaptiveSampler modülünün collectParametricSegments yardımcısını kullanır.
 *
 * Varsayılan θ aralığı [0, 4π]:
 *   - Tam dairesel eğrileri (sin, cos) bir turda kapatır (2π)
 *   - Gül eğrileri, lemniskat vb. çok döngülü eğrileri destekler (4π)
 *
 * Kullanım:
 *   PolarDrawer.draw(renderer, { evaluateFn, color })
 */

import { collectParametricSegments, drawSegments } from './adaptiveSampler.js';
import { DomainRestriction } from '../../core/DomainRestriction.js';

export const PolarDrawer = {
    /**
     * Polar eğriyi canvas'a çizer.
     *
     * @param {object} renderer   CanvasRenderer instance
     * @param {{ evaluateFn: (th:number) => {x,y}|null, color: string }} curve
     */
    draw(renderer, curve) {
        const { evaluateFn, color, rawEvaluateFn, domainEndpoints } = curve;

        const tMin  = curve.tMin  ?? 0;
        const tMax  = curve.tMax  ?? 4 * Math.PI;
        // Temel adım sayısı: en az 800, zoom arttıkça incelir
        const range = Math.abs(tMax - tMin);
        const steps = Math.max(800, Math.round(range * renderer.scale / 3));

        const { segments } = collectParametricSegments(
            evaluateFn, tMin, tMax, steps, renderer
        );

        drawSegments(renderer.ctx, segments, color);

        // ── Domain sınır noktası işaretleri ──────────────────────────────────
        if (domainEndpoints && rawEvaluateFn) {
            const ctx = renderer.ctx;
            for (const ep of domainEndpoints) {
                const v = ep.varName;
                if (v !== 'th' && v !== 'theta') continue;
                const thVal = ep.getValue();
                if (thVal === null) continue;
                const pt = rawEvaluateFn(thVal);
                if (!pt || !isFinite(pt.x) || !isFinite(pt.y)) continue;
                DomainRestriction.tryDrawTransitionDot(
                    ctx, renderer, thVal, pt, evaluateFn, color, ep.isInclusive
                );
            }
        }
    }
};
