/**
 * @fileoverview 这条规则定义为：
 * 1、非 revert 类型提交信息标题长度不能超过指定值。
 * 2、revert 类型提交信息标题长度不能超过指定值+固定前缀的长度。
 * @author wubin
 */

const isRevertType = require('../utils/is-revert-type')

module.exports = ({ type, header }, when = 'never', value = 72) => {
  const always = when === 'always'
  if (!always) {
    return [true]
  }
  if (!(typeof header === 'string')) {
    return [true]
  }
  const headerLength = header.length
  if (isRevertType(type)) {
    const revertMaxLength = value + 'revert!: '.length
    return [
      headerLength <= revertMaxLength,
      `revert 类型提交信息标题长度不应超过 ${revertMaxLength}，当前长度为 ${headerLength}。`,
    ]
  }
  return [headerLength <= value, `非 revert 类型提交信息标题长度不应超过 ${value}，当前长度为 ${headerLength}。`]
}
