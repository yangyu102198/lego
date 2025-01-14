import { Applyer, TreeNode, Engin } from '@lego/core';
import { setterDefaultProps } from '@type/setterDefaultProps';

export function getDomElementPosition(domElement: HTMLElement) {
    const postion = domElement.getBoundingClientRect();
    return postion;
}

export function getDomElementStyle(domElement: HTMLElement, name: string) {
    const style = window.getComputedStyle(domElement);
    return style[name];
}

type Props = {
    setterConfig: Record<string, any>;
    applyer: Applyer;
    treeNode?: TreeNode;
    engin?: Engin;
};

export function getConfig(
    props: setterDefaultProps,
    attrs = {}
): Record<string, any> {
    let { config = {} } = props.setterConfig;
    if (typeof config == 'function') {
        config = config(props.engin, props.treeNode);
    } else {
        config = {
            ...config
        };
    }
    delete config['slots'];
    return {
        ...attrs,
        ...config
    };
}

export function getSlots(props: Props, slots = {}) {
    let { config = {} } = props.setterConfig;
    if (typeof config == 'function') {
        config = config(props.engin, props.treeNode);
    } else {
        config = {
            ...config
        };
    }
    return {
        ...slots,
        ...config.slots
    };
}

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
