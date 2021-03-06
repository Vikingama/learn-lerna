/**
 * @fileoverview 这条规则定义为：
 * 1、如果提交 footer 包含不兼容变更 BREAKING CHANGE，需要在类型/作用域前缀之后，':'之前，附加'!'字符，以进一步提醒注意破坏性变更。
 * 2、如果提交 footer 不包含不兼容变更 BREAKING CHANGE，不能类型/作用域前缀之后，':'之前附加'!'字符。
 * 示例如下：
 * build(root)!: 修改命名空间结构体，以 yaml 资源形式定义
 *
 * 修改命名空间的结构体，替换原表单形式，用 yaml 资源的形式取代。
 *
 * BREAKING CHANGE: 本次修改涉及 xxx 文件，具体改动内容为 xxx，影响模块 xxx，需要进行 xxx 处理以兼容本次修改。
 * @author wubin
 */

module.exports = ({ header, type, scope, footer }, when = 'never') => {
  const always = when === 'always'
  if (!always) {
    return [true]
  }

  const hasBreakingChange = typeof footer === 'string' ? footer.indexOf('BREAKING CHANGE') >= 0 : false

  const hasAttention = header.startsWith(`${type}(${scope})!: `) || header.startsWith(`${type}!: `)

  if (hasBreakingChange) {
    return [
      hasAttention,
      "本次提交包含不兼容的变更 BREAKING CHANGE，需要在类型/作用域前缀之后，':'之前，附加'!'字符，以进一步提醒注意破坏性变更。",
    ]
  }
  if (hasAttention) {
    return [
      hasBreakingChange,
      "只有在提交包含不兼容的变更 BREAKING CHANGE 时，才需要在类型/作用域前缀之后，':'之前，附加'!'字符，否则不要添加。",
    ]
  }
  return [true]
}
