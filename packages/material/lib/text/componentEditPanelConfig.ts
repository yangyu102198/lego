import {
    createRowSetter,
    createColLabel,
    createColNomalSetter
} from '@utils/helper';

export default [
    {
        tabName: '样式',
        setters: [
            {
                setter: 'normal-style'
            }
        ]
    },
    {
        tabName: '属性',
        setters: [
            createRowSetter([
                createColLabel({ config: { label: '文本内容' } }),
                createColNomalSetter({
                    setter: 'input',
                    prop: 'props.textContent',
                    config: {
                        type: 'textarea'
                    }
                })
            ]),

            createRowSetter([
                createColLabel({ config: { label: '标记' } }),
                createColNomalSetter({
                    setter: 'switch',
                    prop: 'props.mark'
                })
            ])
        ]
    }
];
