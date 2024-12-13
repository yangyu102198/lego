import { type FnType } from '@type/utils';
export default function createPromiseCallback() {
    let resolve: FnType, reject: FnType;

    const ps = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    const callback = (err, result?) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    };

    callback.promise = ps;
    return callback;
}
