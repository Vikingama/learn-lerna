module.exports = {
  extends: [require.resolve('./vue'), 'plugin:node/recommended', 'prettier', 'prettier/vue'],
  plugins: ['node'],
  env: {
    node: true,
  },
}
