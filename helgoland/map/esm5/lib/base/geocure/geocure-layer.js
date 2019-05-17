/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var GeoCureGeoJSON = /** @class */ (function (_super) {
    tslib_1.__extends(GeoCureGeoJSON, _super);
    function GeoCureGeoJSON(options) {
        var _this = _super.call(this) || this;
        if (options) {
            _this.options = options;
        }
        return _this;
    }
    /**
     * @return {?}
     */
    GeoCureGeoJSON.prototype.getEvents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var events = {
            moveend: function (event) { return _this.fetchData(event.target); }
        };
        return events;
    };
    /**
     * @param {?} map
     * @return {?}
     */
    GeoCureGeoJSON.prototype.onAdd = /**
     * @param {?} map
     * @return {?}
     */
    function (map) {
        _super.prototype.onAdd.call(this, map);
        this.fetchData(map);
        return this;
    };
    /**
     * @param {?} map
     * @return {?}
     */
    GeoCureGeoJSON.prototype.fetchData = /**
     * @param {?} map
     * @return {?}
     */
    function (map) {
        /** @type {?} */
        var matchMaxZoom = this.options.showOnMaxZoom ? map.getZoom() <= this.options.showOnMaxZoom : true;
        /** @type {?} */
        var matchMinZoom = this.options.showOnMinZoom ? map.getZoom() >= this.options.showOnMinZoom : true;
        if (matchMinZoom && matchMaxZoom) {
            this.loadData(map.getBounds());
        }
        else {
            this.clearLayers();
        }
    };
    /**
     * @param {?} bounds
     * @return {?}
     */
    GeoCureGeoJSON.prototype.loadData = /**
     * @param {?} bounds
     * @return {?}
     */
    function (bounds) {
        var _this = this;
        /** @type {?} */
        var bboxparam = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()].join(',');
        this.options.httpClient
            .get(this.options.url, {
            params: {
                bbox: bboxparam
            }
        })
            .subscribe(function (geojson) {
            _this.clearLayers();
            _this.addData(geojson);
        });
    };
    return GeoCureGeoJSON;
}(GeoJSON));
export { GeoCureGeoJSON };
if (false) {
    /** @type {?} */
    GeoCureGeoJSON.prototype.options;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvY3VyZS1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoZWxnb2xhbmQvbWFwLyIsInNvdXJjZXMiOlsibGliL2Jhc2UvZ2VvY3VyZS9nZW9jdXJlLWxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLE9BQU8sRUFBOEMsTUFBTSxTQUFTLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFTOUUsSUFBQTtJQUFvQywwQ0FBTztJQUl2Qyx3QkFDSSxPQUErQjtRQURuQyxZQUdJLGlCQUFPLFNBSVY7UUFIRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDMUI7O0tBQ0o7Ozs7SUFFTSxrQ0FBUzs7Ozs7O1FBQ1osSUFBTSxNQUFNLEdBQUc7WUFDWCxPQUFPLEVBQUUsVUFBQyxLQUFtQixJQUFLLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQTVCLENBQTRCO1NBQ2pFLENBQUM7UUFDRixNQUFNLENBQUMsTUFBTSxDQUFDOzs7Ozs7SUFHWCw4QkFBSzs7OztjQUFDLEdBQVU7UUFDbkIsaUJBQU0sS0FBSyxZQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7O0lBR1Isa0NBQVM7Ozs7Y0FBQyxHQUFVOztRQUN4QixJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7O1FBQ3JHLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNyRyxFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQ2xDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7Ozs7OztJQUdHLGlDQUFROzs7O2NBQUMsTUFBb0I7OztRQUNqQyxJQUFNLFNBQVMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2RyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVU7YUFDbEIsR0FBRyxDQUFvRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUN0RSxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFNBQVM7YUFDbEI7U0FDSixDQUFDO2FBQ0QsU0FBUyxDQUFDLFVBQUMsT0FBTztZQUNmLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pCLENBQUMsQ0FBQzs7eUJBekRmO0VBVW9DLE9BQU8sRUFpRDFDLENBQUE7QUFqREQsMEJBaURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEdlb0pTT04sIEdlb0pTT05PcHRpb25zLCBMYXRMbmdCb3VuZHMsIExlYWZsZXRFdmVudCB9IGZyb20gJ2xlYWZsZXQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdlb0N1cmVHZW9KU09OT3B0aW9ucyBleHRlbmRzIEdlb0pTT05PcHRpb25zIHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBodHRwQ2xpZW50OiBIdHRwQ2xpZW50O1xuICAgIHNob3dPbk1pblpvb20/OiBudW1iZXI7XG4gICAgc2hvd09uTWF4Wm9vbT86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEdlb0N1cmVHZW9KU09OIGV4dGVuZHMgR2VvSlNPTiB7XG5cbiAgICBwdWJsaWMgb3B0aW9uczogR2VvQ3VyZUdlb0pTT05PcHRpb25zO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIG9wdGlvbnM/OiBHZW9DdXJlR2VvSlNPTk9wdGlvbnNcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RXZlbnRzKCkge1xuICAgICAgICBjb25zdCBldmVudHMgPSB7XG4gICAgICAgICAgICBtb3ZlZW5kOiAoZXZlbnQ6IExlYWZsZXRFdmVudCkgPT4gdGhpcy5mZXRjaERhdGEoZXZlbnQudGFyZ2V0KVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZXZlbnRzO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkFkZChtYXA6IEwuTWFwKTogdGhpcyAge1xuICAgICAgICBzdXBlci5vbkFkZChtYXApO1xuICAgICAgICB0aGlzLmZldGNoRGF0YShtYXApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGZldGNoRGF0YShtYXA6IEwuTWFwKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoTWF4Wm9vbSA9IHRoaXMub3B0aW9ucy5zaG93T25NYXhab29tID8gbWFwLmdldFpvb20oKSA8PSB0aGlzLm9wdGlvbnMuc2hvd09uTWF4Wm9vbSA6IHRydWU7XG4gICAgICAgIGNvbnN0IG1hdGNoTWluWm9vbSA9IHRoaXMub3B0aW9ucy5zaG93T25NaW5ab29tID8gbWFwLmdldFpvb20oKSA+PSB0aGlzLm9wdGlvbnMuc2hvd09uTWluWm9vbSA6IHRydWU7XG4gICAgICAgIGlmIChtYXRjaE1pblpvb20gJiYgbWF0Y2hNYXhab29tKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKG1hcC5nZXRCb3VuZHMoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyTGF5ZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWREYXRhKGJvdW5kczogTGF0TG5nQm91bmRzKSB7XG4gICAgICAgIGNvbnN0IGJib3hwYXJhbSA9IFtib3VuZHMuZ2V0V2VzdCgpLCBib3VuZHMuZ2V0U291dGgoKSwgYm91bmRzLmdldEVhc3QoKSwgYm91bmRzLmdldE5vcnRoKCldLmpvaW4oJywnKTtcbiAgICAgICAgdGhpcy5vcHRpb25zLmh0dHBDbGllbnRcbiAgICAgICAgICAgIC5nZXQ8R2VvSlNPTi5GZWF0dXJlQ29sbGVjdGlvbjxHZW9KU09OLkdlb21ldHJ5T2JqZWN0Pj4odGhpcy5vcHRpb25zLnVybCwge1xuICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICBiYm94OiBiYm94cGFyYW1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZ2VvanNvbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJMYXllcnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZERhdGEoZ2VvanNvbik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=