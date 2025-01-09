import { computed, useAttrs } from 'vue';
import { getConfig } from '@utils/index';

const useConfigHook = (props, defaultConfig?) => {
    const $attrs = useAttrs();

    const config = computed(() => {
        const obj = getConfig(props, $attrs);
        return {
            ...defaultConfig,
            ...obj
        };
    });

    return config;
};

export default useConfigHook;
