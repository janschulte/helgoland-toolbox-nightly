/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { GeoJSON } from 'leaflet';
/**
 * @record
 */
export function GeoCureGeoJSONOptions() { }
/** @type {?} */
GeoCureGeoJSONOptions.prototype.url;
/** @type {?} */
GeoCureGeoJSONOptions.prototype.httpClient;
/** @type {?|undefined} */
GeoCureGeoJSONOptions.prototype.showOnMinZoom;
/** @type {?|undefined} */
GeoCureGeoJSONOptions.prototype.showOnMaxZoom;
export class GeoCureGeoJSON extends GeoJSON {
    /**
     * @param {?=} options
     */
    constructor(options) {
        super();
        if (options) {
            this.options = options;
        }
    }
    /**
     * @return {?}
     */
    getEvents() {
        /** @type {?} */
        const events = {
            moveend: (event) => this.fetchData(event.target)
        };
        return events;
    }
    /**
     * @param {?} map
     * @return {?}
     */
    onAdd(map) {
        super.onAdd(map);
        this.fetchData(map);
        return this;
    }
    /**
     * @param {?} map
     * @return {?}
     */
    fetchData(map) {
        /** @type {?} */
        const matchMaxZoom = this.options.showOnMaxZoom ? map.getZoom() <= this.options.showOnMaxZoom : true;
        /** @type {?} */
        const matchMinZoom = this.options.showOnMinZoom ? map.getZoom() >= this.options.showOnMinZoom : true;
        if (matchMinZoom && matchMaxZoom) {
            this.loadData(map.getBounds());
        }
        else {
            this.clearLayers();
        }
    }
    /**
     * @param {?} bounds
     * @return {?}
     */
    loadData(bounds) {
        /** @type {?} */
        const bboxparam = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()].join(',');
        this.options.httpClient
            .get(this.options.url, {
            params: {
                bbox: bboxparam
            }
        })
            .subscribe((geojson) => {
            this.clearLayers();
            this.addData(geojson);
        });
    }
}
if (false) {
    /** @type {?} */
    GeoCureGeoJSON.prototype.options;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvY3VyZS1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbWFwLyIsInNvdXJjZXMiOlsibGliL2Jhc2UvZ2VvY3VyZS9nZW9jdXJlLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsT0FBTyxFQUE4QyxNQUFNLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQVM5RSxNQUFNLHFCQUFzQixTQUFRLE9BQU87Ozs7SUFJdkMsWUFDSSxPQUErQjtRQUUvQixLQUFLLEVBQUUsQ0FBQztRQUNSLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUMxQjtLQUNKOzs7O0lBRU0sU0FBUzs7UUFDWixNQUFNLE1BQU0sR0FBRztZQUNYLE9BQU8sRUFBRSxDQUFDLEtBQW1CLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUNqRSxDQUFDO1FBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7Ozs7O0lBR1gsS0FBSyxDQUFDLEdBQVU7UUFDbkIsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7OztJQUdSLFNBQVMsQ0FBQyxHQUFVOztRQUN4QixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7O1FBQ3JHLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNyRyxFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQ2xDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7Ozs7OztJQUdHLFFBQVEsQ0FBQyxNQUFvQjs7UUFDakMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVO2FBQ2xCLEdBQUcsQ0FBb0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDdEUsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxTQUFTO2FBQ2xCO1NBQ0osQ0FBQzthQUNELFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pCLENBQUMsQ0FBQzs7Q0FFZCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBHZW9KU09OLCBHZW9KU09OT3B0aW9ucywgTGF0TG5nQm91bmRzLCBMZWFmbGV0RXZlbnQgfSBmcm9tICdsZWFmbGV0JztcblxuZXhwb3J0IGludGVyZmFjZSBHZW9DdXJlR2VvSlNPTk9wdGlvbnMgZXh0ZW5kcyBHZW9KU09OT3B0aW9ucyB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgaHR0cENsaWVudDogSHR0cENsaWVudDtcbiAgICBzaG93T25NaW5ab29tPzogbnVtYmVyO1xuICAgIHNob3dPbk1heFpvb20/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBHZW9DdXJlR2VvSlNPTiBleHRlbmRzIEdlb0pTT04ge1xuXG4gICAgcHVibGljIG9wdGlvbnM6IEdlb0N1cmVHZW9KU09OT3B0aW9ucztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBvcHRpb25zPzogR2VvQ3VyZUdlb0pTT05PcHRpb25zXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgICAgICAgbW92ZWVuZDogKGV2ZW50OiBMZWFmbGV0RXZlbnQpID0+IHRoaXMuZmV0Y2hEYXRhKGV2ZW50LnRhcmdldClcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGV2ZW50cztcbiAgICB9XG5cbiAgICBwdWJsaWMgb25BZGQobWFwOiBMLk1hcCk6IHRoaXMgIHtcbiAgICAgICAgc3VwZXIub25BZGQobWFwKTtcbiAgICAgICAgdGhpcy5mZXRjaERhdGEobWFwKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmZXRjaERhdGEobWFwOiBMLk1hcCkge1xuICAgICAgICBjb25zdCBtYXRjaE1heFpvb20gPSB0aGlzLm9wdGlvbnMuc2hvd09uTWF4Wm9vbSA/IG1hcC5nZXRab29tKCkgPD0gdGhpcy5vcHRpb25zLnNob3dPbk1heFpvb20gOiB0cnVlO1xuICAgICAgICBjb25zdCBtYXRjaE1pblpvb20gPSB0aGlzLm9wdGlvbnMuc2hvd09uTWluWm9vbSA/IG1hcC5nZXRab29tKCkgPj0gdGhpcy5vcHRpb25zLnNob3dPbk1pblpvb20gOiB0cnVlO1xuICAgICAgICBpZiAobWF0Y2hNaW5ab29tICYmIG1hdGNoTWF4Wm9vbSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YShtYXAuZ2V0Qm91bmRzKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbGVhckxheWVycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkRGF0YShib3VuZHM6IExhdExuZ0JvdW5kcykge1xuICAgICAgICBjb25zdCBiYm94cGFyYW0gPSBbYm91bmRzLmdldFdlc3QoKSwgYm91bmRzLmdldFNvdXRoKCksIGJvdW5kcy5nZXRFYXN0KCksIGJvdW5kcy5nZXROb3J0aCgpXS5qb2luKCcsJyk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5odHRwQ2xpZW50XG4gICAgICAgICAgICAuZ2V0PEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb248R2VvSlNPTi5HZW9tZXRyeU9iamVjdD4+KHRoaXMub3B0aW9ucy51cmwsIHtcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgYmJveDogYmJveHBhcmFtXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGdlb2pzb24pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyTGF5ZXJzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGREYXRhKGdlb2pzb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIl19