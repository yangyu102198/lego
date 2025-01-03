const displayReg = /display:([^;]*);/;
export default [
    {
        tabName: '样式',
        setters: [
            {
                prop: 'style',
                setter: 'normal-style'
            },
            {
                prop: 'style',
                setter: 'checkbox',
                applyer: instance => {
                    const oldGetter = instance.getter.bind(instance);
                    const oldSetter = instance.setter.bind(instance);
                    return {
                        getter() {
                            const displayValue = oldGetter();
                            const value = '';
                            const match = displayReg.exec(displayValue);
                            return (match && match[1]) || value;
                        },
                        setter(value) {
                            const replaceValue = `display: ${value};`;
                            let currentValue = oldGetter() || '';
                            const match = displayReg.exec(currentValue);
                            if (match) {
                                currentValue = currentValue.replace(
                                    displayReg,
                                    replaceValue
                                );
                            } else {
                                currentValue += '\n' + replaceValue + '\n';
                            }
                            oldSetter(currentValue);
                        }
                    };
                },
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
        ]
    }
];
