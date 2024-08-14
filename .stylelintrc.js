module.exports = {
  defaultSeverity: 'error',
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-config-prettier'],
  ignoreDisables: true,
  ignoreFiles: ['**/*.json'],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-declaration-strict-value',
    'stylelint-scss',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'plugin/declaration-block-no-ignored-properties': true,
    'scale-unlimited/declaration-strict-value': [
      ['/color$/', 'z-index'],
      {
        ignoreKeywords: {
          '/color$/': ['currentColor', 'inherit', 'transparent'],
          'z-index': ['auto'],
        },
        disableFix: true,
      },
    ],
  },
}
