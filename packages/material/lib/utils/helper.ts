export const createSetter = (config: Record<string, any>, children: any[]) => {
    const setter: Record<string, any> = {
        children: [],
        ...config
    };
    if (children) {
        children.forEach(item => {
            let child = item;
            if (typeof item == 'function') {
                child = item();
            }
            child = Array.isArray(child) ? child : [child];
            setter.children.push(...child);
        });
    }
    return setter;
};

export const createColSetter =
    preSetterConfig =>
    (
        setterConfig: Record<string, any>,
        colConfig: Record<string, any> = { config: { span: 5 } }
    ) => {
        return createSetter(
            {
                setter: 'layout-col',
                ...colConfig
            },
            [
                {
                    ...preSetterConfig(),
                    ...setterConfig
                }
            ]
        );
    };

export const createColLabel = createColSetter(() => {
    return {
        setter: 'layout-label'
    };
});

export const createColNomalSetter = createColSetter(() => {
    return {};
});

export const createRowSetter = (
    config: Record<string, any> | any[],
    children?: any[]
) => {
    if (Array.isArray(config)) {
        children = config;
        config = {};
    }
    config = {
        setter: 'layout-row',
        ...config
    };
    return createSetter(config, children!);
};
