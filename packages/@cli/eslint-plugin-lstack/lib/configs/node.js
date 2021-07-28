module.exports = {
  extends: [require.resolve('./base'), 'plugin:node/recommended', 'prettier'],
  plugins: ['node'],
  env: {
    node: true,
  },
}
