const { getCommitScopes } = require('./git')
const rules = require('./commitlint.rules')

const commitScopes = getCommitScopes()
/*
 * type(scope?): subject
 * body?
 * footer?
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules,
    },
  ],
  /*
   * Level-[0.1.2]: 0-disables、1-warning、2-error
   * Applicable-always|never: never-inverts the rule
   * Value: value to use for this rule
   */
  rules: {
    'body-full-stop': [0],
    'body-leading-blank': [2, 'always'],
    'body-empty': [0],
    'body-max-length': [2, 'always', 144],
    'body-max-line-length': [0],
    'body-min-length': [0],
    'body-case': [0],
    'footer-leading-blank': [2, 'always'],
    'footer-empty': [0],
    'footer-max-length': [0],
    'footer-max-line-length': [2, 'always', 1],
    'footer-min-length': [0],
    'header-case': [0],
    'header-full-stop': [0],
    'header-max-length': [0],
    'header-min-length': [0],
    'references-empty': [0],
    'scope-enum': [0],
    'scope-case': [2, 'always', 'lower-case'],
    'scope-empty': [2, 'never'],
    'scope-max-length': [0],
    'scope-min-length': [0],
    'subject-case': [0],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [0],
    'subject-max-length': [0],
    'subject-min-length': [2, 'always', 5],
    'type-enum': [2, 'always', ['build', 'ci', 'feat', 'fix', 'st', 'sit', 'style', 'version']],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-max-length': [0],
    'type-min-length': [0],
    'signed-off-by': [0],
    'custom-subject-action-enum': [
      2,
      'always',
      ['添加', '完善', '修复', '解决', '删除', '禁用', '修改', '调整', '优化', '重构', '发布', '合并'],
    ],
    'custom-scope-enum': [2, 'always', ['root', ...commitScopes]],
  },
}
