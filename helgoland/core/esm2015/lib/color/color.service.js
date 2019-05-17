/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class ColorService {
    /**
     * Creates a random color and return it as a hex string.
     * @return {?}
     */
    getColor() {
        return this.getRandomColor();
    }
    /**
     * Converts a hex string and opacity in percent to RGBA color as string.
     * @param {?} hex
     * @param {?} opacity
     * @return {?}
     */
    convertHexToRGBA(hex, opacity) {
        hex = hex.replace('#', '');
        /** @type {?} */
        const r = parseInt(hex.substring(0, 2), 16);
        /** @type {?} */
        const g = parseInt(hex.substring(2, 4), 16);
        /** @type {?} */
        const b = parseInt(hex.substring(4, 6), 16);
        return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    }
    /**
     * @return {?}
     */
    getRandomColor() {
        /** @type {?} */
        const letters = '0123456789ABCDEF';
        /** @type {?} */
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
ColorService.decorators = [
    { type: Injectable },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jb2xvci9jb2xvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE1BQU07Ozs7O0lBS0ssUUFBUTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Ozs7Ozs7O0lBTTFCLGdCQUFnQixDQUFDLEdBQVcsRUFBRSxPQUFlO1FBQ2hELEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQzs7UUFDM0IsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDOztRQUM1QyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7O1FBQzVDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDOzs7OztJQUcvRCxjQUFjOztRQUNsQixNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQzs7UUFDbkMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDekIsS0FBSyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQzs7OztZQTNCcEIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbG9yU2VydmljZSB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcmFuZG9tIGNvbG9yIGFuZCByZXR1cm4gaXQgYXMgYSBoZXggc3RyaW5nLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRDb2xvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRSYW5kb21Db2xvcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgaGV4IHN0cmluZyBhbmQgb3BhY2l0eSBpbiBwZXJjZW50IHRvIFJHQkEgY29sb3IgYXMgc3RyaW5nLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb252ZXJ0SGV4VG9SR0JBKGhleDogc3RyaW5nLCBvcGFjaXR5OiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICBoZXggPSBoZXgucmVwbGFjZSgnIycsICcnKTtcbiAgICAgICAgY29uc3QgciA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwgMiksIDE2KTtcbiAgICAgICAgY29uc3QgZyA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMiwgNCksIDE2KTtcbiAgICAgICAgY29uc3QgYiA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNCwgNiksIDE2KTtcbiAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyByICsgJywnICsgZyArICcsJyArIGIgKyAnLCcgKyBvcGFjaXR5IC8gMTAwICsgJyknO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UmFuZG9tQ29sb3IoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgbGV0dGVycyA9ICcwMTIzNDU2Nzg5QUJDREVGJztcbiAgICAgICAgbGV0IGNvbG9yID0gJyMnO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgY29sb3IgKz0gbGV0dGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNildO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xvcjtcbiAgICB9XG5cbn1cbiJdfQ==