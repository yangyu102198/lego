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

export const createSizeApplyer = (style?: string) => (instance: Applyer) => {
    const oldApplyer = createApplyer(style)(instance);
    return {
        getter(styleName?) {
            return parseInt(oldApplyer.getter(styleName));
        },
        setter(styleName, value) {
            if (value == null) {
                value = styleName;
                styleName = null;
            }
            value = value == '' ? value : value + 'px';
            if (styleName) {
                oldApplyer.setter(styleName, value);
            } else {
                oldApplyer.setter(value);
            }
        }
    };
};
