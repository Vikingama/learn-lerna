const { getCommitScopes } = require('@cli/git/lib/commit')
const chalk = require('chalk')

let commitScopes

try {
  commitScopes = getCommitScopes()
} catch (e) {
  process.stderr.write(
    chalk.red(
      `出错了！\n在 @cli/commitlint-config-lstack 中，lstack-scope-enum 默认您的项目为 monorepo 工程，且使用 yarn workspaces 作为限定 scopes。如果您希望关闭该限制或自定义 scopes，请重新配置该规则。\n当前遇到的具体错误如下：\n${e}\n`
    )
  )
  commitScopes = []
}

module.exports = {
  extends: ['@commitlint/config-conventional'],
  // @cli/lstack 为 @cli/commitlint-plugin-lstack 缩写，参见：https://commitlint.js.org/#/reference-plugins
  plugins: ['@cli/lstack'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    'header-max-length': [0],
    'scope-empty': [0],
    'scope-enum': [0],
    'subject-full-stop': [0],
    'subject-min-length': [2, 'always', 5],
    'type-enum': [
      2,
      'always',
      ['build', 'ci', 'feat', 'fix', 'st', 'sit', 'style', 'test', 'docs', 'revert', 'version', 'pref', 'refactor'],
    ],
    'lstack-breaking-change-attention': [2, 'always'],
    'lstack-header-max-length': [2, 'always', 72],
    'lstack-release-branch-type-valid': [2, 'always', 'release'],
    'lstack-scope-empty': [2, 'always'],
    'lstack-scope-enum': [2, 'always', ['root'].concat(commitScopes)],
    'lstack-single-tapd-bug': [2, 'always'],
    'lstack-subject-action-enum': [
      2,
      'always',
      ['添加', '完善', '修复', '解决', '删除', '禁用', '修改', '调整', '优化', '重构', '发布', '合并'],
    ],
    'lstack-subject-action-valid': [2, 'always'],
    'lstack-subject-full-stop': [2, 'always', ['.', '。', '!', '！', ',', '，', ';', '；', '、']],
  },
}
