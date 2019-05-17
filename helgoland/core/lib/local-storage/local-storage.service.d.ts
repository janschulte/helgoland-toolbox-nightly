/**
 * LocalStorage save objects with a given key
 *
 * @export
 */
export declare class LocalStorage {
    private localStorageEnabled;
    constructor();
    /**
     * Saves the object with the key in the local storage
     *
     * @param key
     * @param object
     * @returns successfull saving
     * @memberof LocalStorage
     */
    save(key: string, object: any): boolean;
    /**
     * loads the object with for the key
     *
     * @param key
     * @returns the object if exists, else null
     * @memberof LocalStorage
     */
    load<T>(key: string): T;
    /**
     * loads an array of objects for the key
     *
     * @param key
     * @returns the array of objects if exists, else null
     * @memberof LocalStorage
     */
    loadArray<T>(key: string): T[];
    /**
     * load a textual string for the given key
     *
     * @param key
     * @returns the string if exists, else null
     * @memberof LocalStorage
     */
    loadTextual(key: string): string;
}
