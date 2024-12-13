export function doOne(fn, ret?) {
    const isdo = false;
    let store;
    return () => {
        if (!isdo) {
            store = fn();
            return store;
        } else {
            return ret ? ret : store;
        }
    };
}
