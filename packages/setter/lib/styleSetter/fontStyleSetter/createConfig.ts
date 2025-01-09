import { createApplyer, createSizeApplyer } from '../createApplyer';
import { getDomElementStyle } from '@utils/index';

const createFontOrLineHeightInputConfig =
    (fontOrLineHeight: string) => (_, treeNode) => {
        const $el = treeNode.component?.$el;
        return {
            type: 'number',
            placeholder: $el
                ? parseInt(getDomElementStyle($el, fontOrLineHeight))
                : '0',

            slots: {
                suffix: () => 'px'
            }
        };
    };

export const createFontAndLineHeightConfig = () => {
    return {
        setter: 'layout-row',
        config: {},
        children: [
            {
                setter: 'layout-col',
                config: { span: 5 },
                children: [
                    {
                        setter: 'layout-label',
                        config: { label: '字号' }
                    }
                ]
            },
            {
                setter: 'layout-col',
                config: { span: 7, style: 'margin-right:10px' },
                children: [
                    {
                        applyer: createSizeApplyer('font-size'),
                        setter: 'input',
                        prop: 'style',
                        config: createFontOrLineHeightInputConfig('fontSize')
                    }
                ]
            },
            {
                setter: 'layout-col',
                config: { span: 3 },
                children: [
                    {
                        setter: 'layout-label',
                        config: { label: '行高' }
                    }
                ]
            },
            {
                setter: 'layout-col',
                config: { span: 7 },
                children: [
                    {
                        applyer: createSizeApplyer('line-height'),
                        setter: 'input',
                        prop: 'style',
                        config: {
                            type: 'number',
                            placeholder: 0,
                            slots: {
                                suffix: () => 'px'
                            }
                        }
                    }
                ]
            }
        ]
    };
};

export const createFontWeightConfig = () => {
    return {
        setter: 'layout-row',
        config: {},
        children: [
            {
                setter: 'layout-col',
                config: { span: 5 },
                children: [
                    {
                        setter: 'layout-label',
                        config: { label: '字重' }
                    }
                ]
            },
            {
                setter: 'layout-col',
                config: { span: 18 },
                children: [
                    {
                        applyer: createApplyer('font-weight'),
                        setter: 'select',
                        prop: 'style',
                        config: {
                            list: [
                                {
                                    value: '100',
                                    label: '100 Thin'
                                },
                                {
                                    value: '200',
                                    label: '200 Extra Light'
                                },
                                {
                                    value: '300',
                                    label: '300 Light'
                                },
                                {
                                    value: '400',
                                    label: '400 Normal'
                                },
                                {
                                    value: '500',
                                    label: '500 Medium'
                                },
                                {
                                    value: '600',
                                    label: '600 Semi Bold'
                                },
                                {
                                    value: '700',
                                    label: '700 Bold'
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    };
};

export const createFontFamilyConfig = () => {
    return {
        setter: 'layout-row',
        config: {},
        children: [
            {
                setter: 'layout-col',
                config: { span: 5 },
                children: [
                    {
                        setter: 'layout-label',
                        config: { label: '字体' }
                    }
                ]
            },
            {
                setter: 'layout-col',
                config: { span: 18 },
                children: [
                    {
                        applyer: createApplyer('font-family'),
                        setter: 'select',
                        prop: 'style',
                        config: {
                            list: [
                                {
                                    value: 'Arial',
                                    label: 'Arial'
                                },
                                {
                                    value: 'Helvetica',
                                    label: 'Helvetica'
                                },
                                {
                                    value: 'serif',
                                    label: 'serif'
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    };
};

export const createFontColorConfig = () => {
    return {
        setter: 'layout-row',
        config: {},
        children: [
            {
                setter: 'layout-col',
                config: { span: 5 },
                children: [
                    {
                        setter: 'layout-label',
                        config: { label: '字体颜色' }
                    }
                ]
            },
            {
                setter: 'layout-col',
                config: { span: 18 },
                children: [
                    {
                        applyer: instance => {
                            const defaultApplyer =
                                createApplyer('color')(instance);
                            const $el = instance.treeNode.component?.$el;
                            return {
                                getter: () => {
                                    return (
                                        defaultApplyer.getter() ||
                                        ($el &&
                                            getDomElementStyle($el, 'color')) ||
                                        '#000'
                                    );
                                },
                                setter: value => {
                                    defaultApplyer.setter(value);
                                }
                            };
                        },
                        setter: 'colorPicker',
                        prop: 'style'
                    }
                ]
            }
        ]
    };
};

export const createTextAlignConfig = () => {
    return {
        setter: 'layout-row',
        config: {},
        children: [
            {
                setter: 'layout-col',
                config: { span: 5 },
                children: [
                    {
                        setter: 'layout-label',
                        config: { label: '对齐' }
                    }
                ]
            },
            {
                setter: 'layout-col',
                config: { span: 18 },
                children: [
                    {
                        applyer: createApplyer('text-align'),
                        setter: 'checkbox',
                        prop: 'style',
                        config: {
                            list: [
                                {
                                    value: 'left',
                                    label: 'material-symbols-light:shelf-position-outline',
                                    tip: '左对齐'
                                },
                                {
                                    value: 'center',
                                    label: 'material-symbols-light:position-bottom-right-outline',
                                    tip: '居中对齐center'
                                },
                                {
                                    value: 'right',
                                    label: 'material-symbols-light:position-top-right-outline',
                                    tip: '右对齐'
                                },
                                {
                                    value: 'justify',
                                    label: 'material-symbols-light:position-top-right-outline',
                                    tip: '两端对齐'
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    };
};

export const createOpacityrConfig = () => {
    return {
        setter: 'layout-row',
        config: {},
        children: [
            {
                setter: 'layout-col',
                config: { span: 5 },
                children: [
                    {
                        setter: 'layout-label',
                        config: { label: '透明度' }
                    }
                ]
            },
            {
                setter: 'layout-col',
                config: { span: 17 },
                children: [
                    {
                        applyer: instance => {
                            const defaultApplyer =
                                createApplyer('opacity')(instance);
                            return {
                                getter() {
                                    const value = defaultApplyer.getter();
                                    return value == '' ? 100 : +value * 100;
                                },
                                setter(value) {
                                    defaultApplyer.setter(+value / 100);
                                }
                            };
                        },
                        setter: 'slider',
                        prop: 'style'
                    }
                ]
            }
        ]
    };
};
