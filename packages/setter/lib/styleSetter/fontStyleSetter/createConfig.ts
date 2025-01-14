import { createApplyer, createSizeApplyer } from '../createApplyer';
import {
    getDomElementStyle,
    createRowSetter,
    createColLabel,
    createColNomalSetter
} from '@utils/index';

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
    return createRowSetter([
        createColLabel({ config: { label: '字号' } }),
        createColNomalSetter(
            {
                applyer: createSizeApplyer('font-size'),
                setter: 'input',
                prop: 'style',
                config: createFontOrLineHeightInputConfig('fontSize')
            },
            { config: { span: 7, style: 'margin-right:10px' } }
        ),
        createColLabel({ config: { label: '行高' } }, { config: { span: 3 } }),
        createColNomalSetter(
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
            },
            { config: { span: 7, style: 'margin-right:10px' } }
        )
    ]);
};

export const createFontWeightConfig = () => {
    return createRowSetter([
        createColLabel({ config: { label: '字重' } }),
        createColNomalSetter(
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
            },
            { config: { span: 18 } }
        )
    ]);
};

export const createFontFamilyConfig = () => {
    return createRowSetter([
        createColLabel({ config: { label: '字体' } }),
        createColNomalSetter(
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
            },
            { config: { span: 18 } }
        )
    ]);
};

export const createFontColorConfig = () => {
    return createRowSetter([
        createColLabel({ config: { label: '字体颜色' } }),
        createColNomalSetter(
            {
                applyer: instance => {
                    const defaultApplyer = createApplyer('color')(instance);
                    const $el = instance.treeNode.component?.$el;
                    return {
                        getter: () => {
                            return (
                                defaultApplyer.getter() ||
                                ($el && getDomElementStyle($el, 'color')) ||
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
            },
            { config: { span: 18 } }
        )
    ]);
};

export const createTextAlignConfig = () => {
    return createRowSetter([
        createColLabel({ config: { label: '对齐' } }),
        createColNomalSetter(
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
            },
            { config: { span: 18 } }
        )
    ]);
};

export const createOpacityrConfig = () => {
    return createRowSetter([
        createColLabel({ config: { label: '透明度' } }),
        createColNomalSetter(
            {
                applyer: instance => {
                    const defaultApplyer = createApplyer('opacity')(instance);
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
            },
            { config: { span: 17 } }
        )
    ]);
};
