const { getCommitScopes } = require('./git')
const scopes = getCommitScopes()

module.exports = {
  subjectLimit: 72,
  subjectSeparator: ': ',
  typePrefix: '',
  typeSuffix: '',
  scopes: [{ name: 'root' }, ...scopes.map(name => ({ name }))],
  scopeOverrides: {},
  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix', 'st', 'sit'],
  skipQuestions: [],
  appendBranchNameToCommitMessage: false,
  // ticketNumberPrefix: '',
  // breakingPrefix: '',
  // footerPrefix: '',
  breaklineChar: '|',
  upperCaseSubject: false,
  askForBreakingChangeFirst: false,
  types: [
    {
      name: 'build:     涉及构建系统及与其相关的外部依赖变动',
      value: 'build',
    },
    {
      name: 'ci:        涉及 CI 配置文件或脚本修改的变动',
      value: 'ci',
    },
    {
      name: 'feat:      增加了新的功能特征，对应 action 只能为“添加”',
      value: 'feat',
    },
    {
      name: 'fix:       修复 bug，对应 action 只能为“修复”',
      value: 'fix',
    },
    {
      name: 'st:        解决 ST 单子，仅限 release 分支，对应 action 只能为“修复”',
      value: 'st',
    },
    {
      name: 'sit:       解决 SIT 单子，仅限 release 分支，对应 action 只能为“修复”',
      value: 'sit',
    },
    {
      name: 'style:     不影响代码含义的风格修改，比如空格、格式化、缺失的分号等，对应 action 只能为“调整”',
      value: 'style',
    },
    {
      name: 'version:   发布版本，一般由脚本自动化发布，对应 action 只能为“发布”',
      value: 'version',
    },
  ],
  messages: {
    type: '选择本次更改的提交类型: \n',
    scope: '选择本次更改涉及模块: \n',
    subject: '输入针对本次更改的简要说明: \n',
    body: '输入针对本次更改的详细描述（非必须），使用" | "进行换行，每行长度不要超过 72: \n', // 这里有问题
    breaking: '如果本次更改存在不兼容的修改，则须对更改的内容进行详细描述，否则无需填写: \n',
    footer: '列举本次更改对应的 Tapd 缺陷 ID（比如 #31、#34）: \n',
    confirmCommit: '是否使用以上提交信息进行提交？',
  },
}
