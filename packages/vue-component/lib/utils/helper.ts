let namespace = 'lego';

const setCssNamespace = (s: string) => {
    namespace = s;
};

export const resolveCssname = (s: string) => {
    return `${namespace}-${s}`;
};

export const helper = {
    setCssNamespace
};
