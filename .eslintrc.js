module.exports = {
  globals: {
    __PRERENDER__INJECTED__: 'readonly',
    __PROJECT__: 'readonly',
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'airbnb-base', // eslint-config-airbnb 剔除了 react 规则
    'plugin:vue/essential', // vue 2.x 规则
    'plugin:promise/recommended', // promise 规则
    'plugin:markdown/recommended', // markdown 中 js 规则
    'plugin:prettier/recommended', // prettier 冲突规则
  ],
  plugins: ['html'],
  root: true, // 根配置
  rules: {
    'import/prefer-default-export': 'off', // 不强制使用默认导出
    'no-param-reassign': [
      'error',
      {
        props: false, // 禁止对函数参数进行重新赋值，形参属性除外
      },
    ],
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true, // 允许在 for 循环中使用 ++
      },
    ],
    'no-restricted-syntax': ['error', 'WithStatement'], // 可以使用函数表达式和 in 操作符号，不能用 with
    'no-shadow': [
      'error',
      {
        allow: ['state', 'series'], // 禁止变量声明与外层作用域的变量同名
      },
    ],
    'no-underscore-dangle': 'off', // 标识符中可以有下划线
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true, // 允许在表达式中使用逻辑短路求值
      },
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false, // 禁止在变量定义之前使用它们，函数声明除外
      },
    ],
    'prefer-destructuring': [
      'error', // 不强制使用数组解构
      {
        array: false,
        object: true,
      },
    ],
    'promise/always-return': 'off', // then 方法可以没有返回值
    'promise/catch-or-return': [
      'error',
      {
        allowFinally: true, // 允许使用 finally
      },
    ],
    'vue/require-default-prop': 'off', // 不要求 prop 有默认值
    'vue/require-prop-types': 'off', // 不要求必须规定 prop 类型
  },
}
