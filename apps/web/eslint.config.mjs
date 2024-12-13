import eslintBase from '../../eslint.config.mjs';
export default [
    ...eslintBase,
    {
        rules: {
            'vue/multi-word-component-names': 'off'
        }
    }
];
