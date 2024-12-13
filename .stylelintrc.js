module.exports = {
    plugins: ['stylelint-prettier'],
    extends: [
        'stylelint-config-standard',
        'stylelint-config-recommended-scss',
        'stylelint-config-recommended-vue/scss',
        'stylelint-config-html/vue',
        'stylelint-config-recess-order',
        'stylelint-config-prettier-scss'
    ],
    ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
    // 指定不同文件对应的解析器
    overrides: [
        {
            files: ['**/*.{vue,html}'],
            extends: ['stylelint-config-html', 'stylelint-config-standard'],
            customSyntax: 'postcss-html'
        },
        {
            files: ['**/*.{css,scss}'],
            customSyntax: 'postcss-scss'
        }
    ],
    // 自定义规则
    rules: {
        // 允许 global 、export 、v-deep等伪类
        'prettier/prettier': true,
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global', 'export', 'v-deep', 'deep']
            }
        ],
        'selector-class-pattern': null,
        'color-function-notation': null,
        'no-descending-specificity': null,
        'font-family-no-missing-generic-family-keyword': null,
        'at-rule-no-unknown': null
    }
};
