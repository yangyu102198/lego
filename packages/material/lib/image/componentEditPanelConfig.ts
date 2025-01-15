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
                createColLabel({ config: { label: '图片链接' } }),
                createColNomalSetter(
                    {
                        setter: 'input',
                        prop: 'props.src'
                    },
                    { config: { span: 18 } }
                )
            ]),

            createRowSetter([
                createColLabel({ config: { label: '标题' } }),
                createColNomalSetter(
                    {
                        setter: 'input',
                        prop: 'props.title'
                    },
                    { config: { span: 18 } }
                )
            ]),
            createRowSetter([
                createColLabel({ config: { label: '代替文本' } }),
                createColNomalSetter(
                    {
                        setter: 'input',
                        prop: 'props.alt'
                    },
                    { config: { span: 18 } }
                )
            ])
        ]
    }
];
