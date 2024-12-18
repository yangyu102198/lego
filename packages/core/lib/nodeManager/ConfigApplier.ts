import { FnType } from '@type/utils';
import normalProperty from '@utils/nomralProperty';

// 配置填充器
export default class ConfigApplier<T = Record<string, any>> {
    constructor(
        private defaultConfig: T,
        private currentConfig: T,
        private propertySetWayMap: Map<string, string | FnType> = new Map()
    ) {}
    setCurrentConfig(propertyName, value) {
        const parsed = normalProperty(this.currentConfig, propertyName);
        if (!parsed) {
            this.setProperty(propertyName, this.currentConfig);
            this.setCurrentConfig(propertyName, value);
        } else {
            parsed.target[parsed.lastProperty!] = value;
        }
    }
    getCurrentConfig(propertyPath?) {
        return this.getConfig(this.currentConfig, propertyPath);
    }
    getDefaultConfig(propertyName) {
        return this.getConfig(this.defaultConfig, propertyName);
    }

    addPropertySetWay(setHandler: FnType) {
        setHandler(this.setter.bind(this));
    }

    private setter(key, type) {
        this.propertySetWayMap.set(key, type);
    }

    private setProperty(propertyPath, config) {
        const list = propertyPath.split('.');

        for (let i = 0; i < list.length - 1; i++) {
            const property = list[i];
            if (!config[property] || typeof config[property] !== 'object') {
                const propertySetWay = this.propertySetWayMap.get(property);
                if (!propertySetWay) {
                    throw new Error(`cant set Field ${propertyPath}`);
                } else {
                    if (propertySetWay === 'object') {
                        config[property] = {};
                    } else {
                        config[property] = [];
                    }
                }
                config = config[property];
            }
        }
    }

    private getConfig(config, propertyPath?: string) {
        if (propertyPath == undefined) {
            return config;
        } else {
            const parsed = normalProperty(config, propertyPath);

            if (!parsed) {
                return;
            } else {
                return parsed.target[parsed.lastProperty!];
            }
        }
    }
}

export const createTreeNodePropertySetWay = setter => {
    setter('componentConfig', 'object');
    setter('componentConfig.props', 'object');
    setter('componentConfig.extra', 'object');
    setter('componentEditConfig', 'object');
};
