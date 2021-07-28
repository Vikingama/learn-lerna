module.exports = {
  extends: [require.resolve('./base'), 'plugin:vue/recommended', 'prettier', 'prettier/vue'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'vue/match-component-file-name': [
      'error',
      {
        extensions: ['js', 'vue'],
        shouldMatchCase: false,
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'],
      plugins: ['@typescript-eslint'],
      rules: {
        'no-useless-constructor': 'off',
      },
    },
  ],
}
