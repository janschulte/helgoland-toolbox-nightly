/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} baseCtors
 * @return {?}
 */
export function Mixin(baseCtors) {
    return (derivedCtor) => {
        baseCtors.forEach((baseCtor) => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWl4aW4uZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhlbGdvbGFuZC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21vZGVsL21peGlucy9NaXhpbi5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxNQUFNLGdCQUFnQixTQUFnQjtJQUNsQyxNQUFNLENBQUMsQ0FBQyxXQUFnQixFQUFFLEVBQUU7UUFDeEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzNCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzVELFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMxRCxDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7S0FDTixDQUFDO0NBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gTWl4aW4oYmFzZUN0b3JzOiBhbnlbXSkge1xuICAgIHJldHVybiAoZGVyaXZlZEN0b3I6IGFueSkgPT4ge1xuICAgICAgICBiYXNlQ3RvcnMuZm9yRWFjaCgoYmFzZUN0b3IpID0+IHtcbiAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJhc2VDdG9yLnByb3RvdHlwZSkuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGRlcml2ZWRDdG9yLnByb3RvdHlwZVtuYW1lXSA9IGJhc2VDdG9yLnByb3RvdHlwZVtuYW1lXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuIl19