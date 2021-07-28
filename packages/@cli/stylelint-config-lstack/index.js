module.exports = {
  extends: [
    'stylelint-plugin-stylus/standard',
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
  ],
  plugins: [
    'stylelint-plugin-stylus',
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-scss',
    'stylelint-declaration-strict-value',
  ],
  rules: {
    // stylelint-config-standard-scss 相较 stylelint-config-standard 只是多了以下两条规则及 stylelint-scss plugin
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    // 以下三条与 prettier 规则冲突
    'stylus/at-rule-no-unknown': null,
    'stylus/at-rule-empty-line-before': null,
    'stylus/block-closing-brace-newline-after': null,
    'comment-empty-line-before': null,
    'function-name-case': ['lower', { ignoreFunctions: ['/colorPalette/'] }],
    'no-invalid-double-slash-comments': null,
    'no-descending-specificity': null,
    'declaration-empty-line-before': null,
    'scale-unlimited/declaration-strict-value': [
      ['/color$/', 'fill', 'stroke', 'z-index'],
      {
        ignoreKeywords: {
          '/color$/': ['currentColor', 'transparent', 'inherit'],
          fill: ['currentColor', 'inherit'],
          stroke: 'currentColor',
          'z-index': 0,
        },
        // 自动修复的规则，具体参考 https://github.com/AndyOGo/stylelint-declaration-strict-value，当前版本暂时关闭该功能
        // autoFixFunc: function () {},
        disableFix: true,
      },
    ],
  },
}
