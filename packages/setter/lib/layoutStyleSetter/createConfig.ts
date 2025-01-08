import { getDomElementPosition } from '@utils/index';
import { Applyer } from '@lego/core';
export const createApplyer =
    (defaultStyleName = '') =>
    instance => {
        const oldGetter = instance.getter.bind(instance);
        const oldSetter = instance.setter.bind(instance);
        const regCreater = str => new RegExp(`${str}:([^;\n]*)[;\n]`);
        return {
            getter(styleName?) {
                const allStyle = oldGetter();
                const match = regCreater(styleName || defaultStyleName).exec(
                    allStyle
                );
                return (match && match[1].trim()) || '';
            },
            setter(styleName, value?) {
                if (value == null) {
                    value = styleName;
                    styleName = null;
                }
                let allStyle = oldGetter() || '';
                const isRemove = value == '';
                styleName = styleName || defaultStyleName;
                const match = regCreater(styleName).exec(allStyle);
                if (isRemove) {
                    if (match) {
                        allStyle = allStyle.replace(match[0], '');
                    }
                } else {
                    if (match) {
                        const newValue = match[0].replace(match[1], value);
                        allStyle = allStyle.replace(match[0], newValue);
                    } else {
                        allStyle += `   \n${styleName}:${value};`;
                    }
                }
                oldSetter(allStyle);
            }
        };
    };

export const createWidthOrHeightApplyer =
    (widthOrHeight: string) => (instance: Applyer) => {
        const oldApplyer = createApplyer(widthOrHeight)(instance);
        return {
            getter() {
                return parseInt(oldApplyer.getter());
            },
            setter(value) {
                oldApplyer.setter(value == '' ? value : value + 'px');
            }
        };
    };

export const createLayoutModeConfig = (params = {}) => {
    return Object.assign(
        {
            setter: 'layout-row',
            config: {},
            children: [
                {
                    setter: 'layout-col',
                    config: { span: 6 },
                    children: [
                        {
                            setter: 'layout-label',
                            config: { label: '布局模式' }
                        }
                    ]
                },
                {
                    setter: 'layout-col',
                    config: { span: 18 },
                    children: [
                        {
                            applyer: createApplyer('display'),
                            setter: 'checkbox',
                            prop: 'style',
                            config: {
                                list: [
                                    {
                                        value: 'inline',
                                        label: 'material-symbols-light:shelf-position-outline',
                                        tip: '内联布局inline'
                                    },
                                    {
                                        value: 'flex',
                                        label: 'material-symbols-light:position-bottom-right-outline',
                                        tip: '弹性布局flex'
                                    },
                                    {
                                        value: 'block',
                                        label: 'material-symbols-light:position-top-right-outline',
                                        tip: '块级布局block'
                                    },
                                    {
                                        value: 'inline-block',
                                        label: 'material-symbols-light:position-top-right-outline',
                                        tip: '内联块级布局inlineBlock'
                                    },
                                    {
                                        value: 'none',
                                        label: 'ic:baseline-hide-source',
                                        tip: '隐藏none'
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        params
    );
};

export const createFlexDirectionConfig = (params = {}) => {
    return Object.assign(
        {
            setter: 'layout-row',
            config: {},
            children: [
                {
                    setter: 'layout-col',
                    config: { span: 6 },
                    children: [
                        {
                            setter: 'layout-label',
                            config: { label: '主轴对齐' }
                        }
                    ]
                },
                {
                    setter: 'layout-col',
                    config: { span: 18 },
                    children: [
                        {
                            applyer: createApplyer('flex-direction'),
                            setter: 'checkbox',
                            prop: 'style',
                            config: {
                                list: [
                                    {
                                        value: 'row',
                                        label: 'material-symbols-light:shelf-position-outline',
                                        tip: '水平方向,起点在左侧row'
                                    },
                                    {
                                        value: 'row-reverse',
                                        label: 'material-symbols-light:position-bottom-right-outline',
                                        tip: '水平方向,起点在右侧row-reverse'
                                    },
                                    {
                                        value: 'column',
                                        label: 'material-symbols-light:position-top-right-outline',
                                        tip: '垂直方向,起点在上沿column'
                                    },
                                    {
                                        value: 'column-reverse',
                                        label: 'material-symbols-light:position-top-right-outline',
                                        tip: '垂直方向,起点在上沿column-reverse'
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        params
    );
};

export const createJustifyContentConfig = (params = {}) => {
    return Object.assign(
        {
            setter: 'layout-row',
            config: {},
            children: [
                {
                    setter: 'layout-col',
                    config: {
                        span: 6
                    },
                    children: [
                        {
                            setter: 'layout-label',
                            config: { label: '主轴对齐' }
                        }
                    ]
                },
                {
                    setter: 'layout-col',
                    config: {
                        span: 18
                    },
                    children: [
                        {
                            applyer: createApplyer('justify-content'),
                            setter: 'checkbox',
                            prop: 'style',
                            config: {
                                list: [
                                    {
                                        value: 'flex-start',
                                        label: 'material-symbols-light:shelf-position-outline',
                                        tip: '左对齐flex-start'
                                    },
                                    {
                                        value: 'flex-end',
                                        label: 'material-symbols-light:position-bottom-right-outline',
                                        tip: '右对齐flex-end'
                                    },
                                    {
                                        value: 'center',
                                        label: 'material-symbols-light:position-top-right-outline',
                                        tip: '水平居中center'
                                    },
                                    {
                                        value: 'space-between',
                                        label: 'material-symbols-light:position-top-right-outline',
                                        tip: '两端对齐space-between'
                                    },
                                    {
                                        value: 'space-around',
                                        label: 'material-symbols-light:position-top-right-outline',
                                        tip: '横向平分space-around'
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        params
    );
};

export const createAlignItemsConfig = (params = {}) => {
    return Object.assign(
        {
            setter: 'layout-row',
            config: {},
            children: [
                {
                    setter: 'layout-col',
                    config: { span: 6 },
                    children: [
                        {
                            setter: 'layout-label',
                            config: { label: '辅轴排列' }
                        }
                    ]
                },
                {
                    setter: 'layout-col',
                    config: { span: 18 },
                    children: [
                        {
                            applyer: createApplyer('align-items'),
                            setter: 'checkbox',
                            prop: 'style',
                            config: {
                                list: [
                                    {
                                        value: 'flex-start',
                                        label: 'material-symbols-light:shelf-position-outline',
                                        tip: '起点对齐flex-start'
                                    },
                                    {
                                        value: 'flex-end',
                                        label: 'material-symbols-light:position-bottom-right-outline',
                                        tip: '终点对齐flex-end'
                                    },
                                    {
                                        value: 'center',
                                        label: 'material-symbols-light:position-top-right-outline',
                                        tip: '水平居中center'
                                    },
                                    {
                                        value: 'baseline',
                                        label: 'material-symbols-light:position-top-right-outline',
                                        tip: '基线第一行文字对齐baseline'
                                    },
                                    {
                                        value: 'stretch',
                                        label: 'material-symbols-light:position-top-right-outline',
                                        tip: '占满容器高度stretch'
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        params
    );
};

export const createWidthAndHeightInputConfig =
    (widthOrHeight: string) => (_, treeNode) => {
        return {
            type: 'number',
            placeholder: treeNode.component?.$el
                ? parseInt(
                      getDomElementPosition(treeNode.component.$el)[
                          widthOrHeight
                      ] + ''
                  )
                : '0',

            slots: {
                suffix: () => 'px'
            }
        };
    };

export const createWidthAndHeight = (params = {}) => {
    return Object.assign(
        {
            setter: 'layout-row',
            config: {},
            children: [
                {
                    setter: 'layout-col',
                    config: { span: 3 },
                    children: [
                        {
                            setter: 'layout-label',
                            config: { label: '宽度' }
                        }
                    ]
                },
                {
                    setter: 'layout-col',
                    config: { span: 9 },
                    children: [
                        {
                            applyer: createWidthOrHeightApplyer('width'),
                            setter: 'input',
                            prop: 'style',
                            config: createWidthAndHeightInputConfig('width')
                        }
                    ]
                },
                {
                    setter: 'layout-col',
                    config: { span: 3 },
                    children: [
                        {
                            setter: 'layout-label',
                            config: { label: '高度' }
                        }
                    ]
                },
                {
                    setter: 'layout-col',
                    config: { span: 9 },
                    children: [
                        {
                            applyer: createWidthOrHeightApplyer('height'),
                            setter: 'input',
                            prop: 'style',
                            config: createWidthAndHeightInputConfig('height')
                        }
                    ]
                }
            ]
        },
        params
    );
};
