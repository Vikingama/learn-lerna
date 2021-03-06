const { getCommitScopes } = require('@cli/git/lib/commit')

const packages = getCommitScopes()

module.exports = {
  types: [
    {
      value: 'build',
      name: 'build:     限定类别，涉及构建系统及与其相关的外部依赖变动，必须使用该类别，且本次提交必须不涉及其他类别。',
    },
    {
      value: 'ci',
      name: 'ci:        限定类别，涉及 CI 配置文件或脚本修改的变动，必须使用该类别，且本次提交必须不涉及其他类别。',
    },
    {
      value: 'feat',
      name:
        'feat:      主类别，增加了新的功能特征，对应 action 只能为`添加，除限定类别外，当一次提交涉及主类别与其他多种类别时，取主类别。',
    },
    {
      value: 'fix',
      name: 'fix:       主类别，修复 bug，bug 定义基线为上一个版本，否则不要选择该类型，对应 action 只能为`修复`。',
    },
    {
      value: 'st',
      name:
        'st:        解决 ST 单子，仅限 release 分支，对应 action 只能为`修复`，该类别必须单独提交，如果单子是上版本引入的，必须选择 fix 类别。',
    },
    {
      value: 'sit',
      name:
        'sit:       解决 SIT 单子，仅限 release 分支，对应 action 只能为`修复`，该类别必须单独提交，如果单子是上版本引入的，必须选择 fix 类别。',
    },
    {
      value: 'style',
      name:
        'style:     不影响代码含义的风格修改，比如空格、格式化、缺失的分号等，对应 action 只能为`调整`，该类别只能单独提交。',
    },
    {
      value: 'test',
      name: 'test:      新增或修改已有测试用例，该类别只能单独提交。',
    },
    {
      value: 'docs',
      name: 'docs:      对文档类文件进行了修改，该类别只能单独提交。',
    },
    {
      value: 'revert',
      name:
        'revert:    回滚 commit 操作，对应 scope 为空，subject 为被回滚 commit message 的 完整 header，该类别只能单独提交。',
    },
    {
      value: 'pref',
      name: 'pref:      提高性能的代码更改，对应 action 只能为`优化`。',
    },
    {
      value: 'refactor',
      name: 'refactor:  既不是修复 bug 也不是添加特征的代码重构。',
    },
    {
      value: 'version',
      name: 'version:   发布版本，一般由脚本自动化发布，对应 action 只能为`发布`。',
    },
  ],
  scopes: [{ name: 'root' }].concat(
    packages.map(pck => {
      return { name: pck }
    })
  ),
  // it needs to match the value for field type. Eg.: 'fix'
  scopeOverrides: {
    revert: [],
  },
  // override the messages, defaults are as follows
  messages: {
    type: 'type：选择本次提交类型，涉及多种类型请分多次进行提交：\n',
    scope: 'scope：选择本次提交涉及模块，涉及多模块请分多次进行提交：\n',
    // 支持自定义 scope 的情况下，对应的提示
    customScope: 'scope：你选择的 type 为 revert，根据规范 scope 需为空，请直接输入回车键进行跳过',
    subject:
      'subject：输入针对本次提交内容的简要说明。\n' +
      '           如果 type 为 revert，该值应为被回滚提交信息的完整 header，如：`revert: build(root): 添加 EditorConfig 工具，统一各 IDE 代码风格`\n' +
      "           否则，以动词 action ['添加', '完善', '修复', '解决', '删除', '禁用', '修改', '调整', '优化', '重构', '发布', '合并'] 加空格开头：\n",
    body:
      "body：输入关于本次提交的详细描述（非必须），使用'|'进行换行，每行长度不要超过 72，\n" +
      "        如果 type 为 revert，首行应为：'This reverts commit <hash>.'\n",
    breaking: '如果本次提交存在不兼容的修改，则必须对变动的内容、以及变动的理由和迁移方法进行详细描述，否则无需填写:\n',
    footer:
      'footer：列举本次提交 Closes 对应的 Tapd 缺陷 ID 或 issue 编号（存在则必填）\n' +
      "          当该提交同时关了多个 issues 时，以','加空格进行分隔，如:`#31, #34`\n" +
      '          注意：当关闭的是 tapd 缺陷单子时，要求一次提交仅能 Closes 一个单子，如：`#1000001`\n',
    confirmCommit: '确认是否以上面生成的 commit message 进行提交？',
  },
  // 是否允许自定义 scope
  allowCustomScopes: false,
  // 允许提交兼容性问题的类别
  allowBreakingChanges: ['feat', 'fix', 'st', 'sit', 'revert'],
  // 跳过询问的环节，如：['body']
  skipQuestions: [],
  // 限制 subject 的长度
  subjectLimit: 72,
  breaklineChar: '|', // It is supported for fields body and footer.
  // 是否最先询问兼容性问题
  askForBreakingChangeFirst: false,
  subjectSeparator: ': ',
  // type 的前缀
  typePrefix: '',
  // type 的后缀
  typeSuffix: '',
  // 页脚前缀，关闭 issue
  footerPrefix: 'Closes',
  breakingPrefix: 'BREAKING CHANGE:\n',
  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',
}
