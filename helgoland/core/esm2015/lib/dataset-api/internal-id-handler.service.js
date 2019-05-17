/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import 'rxjs/operator/map';
import { Injectable } from '@angular/core';
/** @type {?} */
const INTERNAL_ID_SEPERATOR = '__';
/**
 * @record
 */
export function InternalDatasetId() { }
/** @type {?} */
InternalDatasetId.prototype.id;
/** @type {?} */
InternalDatasetId.prototype.url;
/**
 * Service to generate or resolve internal dataset IDs
 */
export class InternalIdHandler {
    /**
     * Generates an internal id for the given dataset.
     * @param {?} dataset The dataset for which the internal id will be generated and saved.
     * @return {?}
     */
    generateInternalId(dataset) {
        dataset.internalId = dataset.url + INTERNAL_ID_SEPERATOR + dataset.id;
    }
    /**
     * Resolves the internal ID to the url and the API specific dataset id.
     * @param {?} internalId The internal id as string
     * @return {?} Construct of url and API id
     */
    resolveInternalId(internalId) {
        /** @type {?} */
        const split = internalId.split(INTERNAL_ID_SEPERATOR);
        if (split.length !== 2) {
            console.error('InternalID ' + internalId + ' is not resolvable');
        }
        else {
            return {
                url: split[0],
                id: split[1]
            };
        }
    }
}
InternalIdHandler.decorators = [
    { type: Injectable },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWwtaWQtaGFuZGxlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2RhdGFzZXQtYXBpL2ludGVybmFsLWlkLWhhbmRsZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUkzQyxNQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O0FBV25DLE1BQU07Ozs7OztJQU1HLGtCQUFrQixDQUFDLE9BQWlCO1FBQ3pDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsR0FBRyxxQkFBcUIsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOzs7Ozs7O0lBUWpFLGlCQUFpQixDQUFDLFVBQWtCOztRQUN6QyxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDdEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDO1NBQ2xFO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUM7Z0JBQ0wsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDYixDQUFDO1NBQ0g7Ozs7WUF6QkosVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAncnhqcy9vcGVyYXRvci9tYXAnO1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IElEYXRhc2V0IH0gZnJvbSAnLi4vbW9kZWwvZGF0YXNldC1hcGkvZGF0YXNldCc7XG5cbmNvbnN0IElOVEVSTkFMX0lEX1NFUEVSQVRPUiA9ICdfXyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW50ZXJuYWxEYXRhc2V0SWQge1xuICBpZDogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbn1cblxuLyoqXG4gKiBTZXJ2aWNlIHRvIGdlbmVyYXRlIG9yIHJlc29sdmUgaW50ZXJuYWwgZGF0YXNldCBJRHNcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEludGVybmFsSWRIYW5kbGVyIHtcblxuICAvKipcbiAgICogR2VuZXJhdGVzIGFuIGludGVybmFsIGlkIGZvciB0aGUgZ2l2ZW4gZGF0YXNldC5cbiAgICogQHBhcmFtIGRhdGFzZXQgVGhlIGRhdGFzZXQgZm9yIHdoaWNoIHRoZSBpbnRlcm5hbCBpZCB3aWxsIGJlIGdlbmVyYXRlZCBhbmQgc2F2ZWQuXG4gICAqL1xuICBwdWJsaWMgZ2VuZXJhdGVJbnRlcm5hbElkKGRhdGFzZXQ6IElEYXRhc2V0KSB7XG4gICAgZGF0YXNldC5pbnRlcm5hbElkID0gZGF0YXNldC51cmwgKyBJTlRFUk5BTF9JRF9TRVBFUkFUT1IgKyBkYXRhc2V0LmlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmVzIHRoZSBpbnRlcm5hbCBJRCB0byB0aGUgdXJsIGFuZCB0aGUgQVBJIHNwZWNpZmljIGRhdGFzZXQgaWQuXG4gICAqIEBwYXJhbSBpbnRlcm5hbElkIFRoZSBpbnRlcm5hbCBpZCBhcyBzdHJpbmdcbiAgICogQHJldHVybnMgQ29uc3RydWN0IG9mIHVybCBhbmQgQVBJIGlkXG4gICAqL1xuICBwdWJsaWMgcmVzb2x2ZUludGVybmFsSWQoaW50ZXJuYWxJZDogc3RyaW5nKTogSW50ZXJuYWxEYXRhc2V0SWQge1xuICAgIGNvbnN0IHNwbGl0ID0gaW50ZXJuYWxJZC5zcGxpdChJTlRFUk5BTF9JRF9TRVBFUkFUT1IpO1xuICAgIGlmIChzcGxpdC5sZW5ndGggIT09IDIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ludGVybmFsSUQgJyArIGludGVybmFsSWQgKyAnIGlzIG5vdCByZXNvbHZhYmxlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVybDogc3BsaXRbMF0sXG4gICAgICAgIGlkOiBzcGxpdFsxXVxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==