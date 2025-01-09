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
