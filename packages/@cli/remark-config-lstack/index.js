module.exports = {
  plugins: [
    'remark-frontmatter',
    'preset-lint-recommended',
    'preset-lint-consistent',
    ['remark-lint-list-item-indent', 'space'],
    ['remark-lint-no-literal-urls', false],
    'remark-validate-links',
    'remark-preset-prettier',
  ],
}
