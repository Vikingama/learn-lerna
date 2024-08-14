/**
 * 1、基础层：base、import、airbnb。制定统一的基础语法和格式规范，提供通用的代码风格和语法规则配置，例如缩进、尾逗号等等。
 * 2、框架支撑层：提供对通用的一些技术场景、框架的支持，包括 ES6、Node.js、React、Vue、React Native 等；这一层借助开源社区的各种插件进行配置，并对各种框架的规则都进行了一定的调整。
 * 3、TypeScript 层：这一层借助 typescript-eslint，提供对 TypeScript 的支持。例如：TS-NODE、TS-REACT、TS-VUE。
 * 4、适配层：提供对特殊场景的定制化支持，例如 内部的定制化方案、配合 prettier 使用、或者团队的特殊规则诉求。
 */
module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    es6: true,
  },
  extends: [
    /**
     * eslint-config-airbnb-base 缩写，airbnb 规范的基础配置，依赖 eslint-plugin-import。
     * 与 eslint-config-airbnb 的区别在于去除 react 相关配置。
     * 具体规则：https://github.com/airbnb/javascript
     */
    'airbnb-base',
    /**
     * eslint-plugin-promise 插件的推荐配置。
     * 具体规则：https://github.com/xjamundx/eslint-plugin-promise
     */
    'plugin:promise/recommended',
    /**
     * eslint-config-prettier 缩写，该配置会禁用 eslint 中关于 Prettier 代码风格相关的配置，
     * 注意该配置的顺序应该位于其他配置之后
     */
    'prettier',
    'prettier/babel',
  ],
  /**
   * 需要在自定义 rules 自定义的 规则，必须在 plugins 中先声明其对应插件
   */
  plugins: ['promise', 'babel', 'prettier'],
  rules: {
    // eslint-plugin-prettier 插件的配置项，配置 Prettier 规则的错误级别
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'],
      plugins: ['@typescript-eslint'],
      rules: {
        'no-useless-constructor': 'off',
      },
    },
    {
      files: ['**/__tests__/**/*.spec.js', '**/__tests__/**/*.spec.ts'],
      env: {
        jest: true,
        jasmine: true,
      },
      extends: ['plugin:jest/recommended'],
      plugins: ['jest'],
    },
    {
      files: ['*.html', '*.htm', '.tpl'],
      plugins: ['html'],
      settings: {
        'html/html-extensions': ['.html', '.htm', '.tpl', '.we'],
      },
    },
    {
      files: ['*.md'],
      plugins: ['markdown'],
    },
  ],
}
