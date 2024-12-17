export const genUUID = () => {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
};

export const copy = data => {
    const iteratorCopy = value => {
        let ret: any;
        if (!value) {
            return value;
        }
        if (Array.isArray(value)) {
            ret = [];
        } else if (typeof value == 'object') {
            ret = {};
        } else {
            return value;
        }

        Object.keys(value).forEach(key => {
            ret[key] = iteratorCopy(value[key]);
        });
        return ret;
    };
    return iteratorCopy(data);
};
