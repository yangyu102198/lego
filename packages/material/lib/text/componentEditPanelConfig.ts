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
                createColNomalSetter(
                    {
                        setter: 'input',
                        prop: 'props.textContent',
                        config: {
                            type: 'textarea'
                        }
                    },
                    { config: { span: 18 } }
                )
            ]),

            createRowSetter([
                createColLabel({ config: { label: '标记' } }),
                createColNomalSetter({
                    setter: 'switch',
                    prop: 'props.mark'
                })
            ]),
            createRowSetter([
                createColLabel({ config: { label: '删除线' } }),
                createColNomalSetter({
                    setter: 'switch',
                    prop: 'props.del'
                })
            ]),
            createRowSetter([
                createColLabel({ config: { label: '下划线' } }),
                createColNomalSetter({
                    setter: 'switch',
                    prop: 'props.u'
                })
            ]),
            createRowSetter([
                createColLabel({ config: { label: '是否加粗' } }),
                createColNomalSetter({
                    setter: 'switch',
                    prop: 'props.strong'
                })
            ])
        ]
    }
];
