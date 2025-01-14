import {
    getDomElementPosition,
    createRowSetter,
    createColLabel,
    createColNomalSetter
} from '@utils/index';
import { createApplyer, createSizeApplyer } from '../createApplyer';
import { Engin, TreeNode, ApplyerFactory } from '@lego/core';

export const createWidthOrHeightInputConfig =
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

export const createLayoutModeConfig = () => {
    return createRowSetter([
        createColLabel({ config: { label: '布局模式' } }),
        createColNomalSetter(
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
            },
            { config: { span: 18 } }
        )
    ]);
};

export const createFlexDirectionConfig = () => {
    return createRowSetter([
        createColLabel({ config: { label: '主轴对齐' } }),
        createColNomalSetter(
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
            },
            { config: { span: 18 } }
        )
    ]);
};

export const createJustifyContentConfig = () => {
    return createRowSetter([
        createColLabel({ config: { label: '主轴对齐' } }),
        createColNomalSetter(
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
            },
            { config: { span: 18 } }
        )
    ]);
};

export const createAlignItemsConfig = () => {
    return createRowSetter([
        createColLabel({ config: { label: '辅轴排列' } }),
        createColNomalSetter(
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
            },
            { config: { span: 18 } }
        )
    ]);
};

export const createWidthAndHeightConfig = () => {
    return createRowSetter([
        createColLabel({ config: { label: '宽度' } }),
        createColNomalSetter(
            {
                applyer: createSizeApplyer('width'),
                setter: 'input',
                prop: 'style',
                config: createWidthOrHeightInputConfig('width')
            },
            { config: { span: 7, style: 'margin-right:10px' } }
        ),
        createColLabel({ config: { label: '高度' } }, { config: { span: 3 } }),
        createColNomalSetter(
            {
                applyer: createSizeApplyer('height'),
                setter: 'input',
                prop: 'style',
                config: createWidthOrHeightInputConfig('height')
            },
            { config: { span: 7, style: 'margin-right:10px' } }
        )
    ]);
};

export const createMarginApplyer = (engin: Engin, treeNode: TreeNode) => {
    return ApplyerFactory(
        {
            engin: engin,
            treeNode: treeNode,
            prop: 'style'
        },
        createSizeApplyer()
    );
};
