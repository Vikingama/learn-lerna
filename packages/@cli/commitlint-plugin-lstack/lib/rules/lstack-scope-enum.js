/**
 * @fileoverview 这条规则定义为：
 * 1、如果提交类别 type 为 revert，则 scope 必须为空。
 * 2、如果提交类别 type 不为 revert，则 scope 必须为指定值之一。
 * @author wubin
 */

const isRevertType = require('../utils/is-revert-type')

module.exports = ({ type, scope }, when = 'never', value = []) => {
  const always = when === 'always'
  if (!always || value.length <= 0) {
    return [true]
  }
  const isScopeEmpty = !!scope
  if (isRevertType(type)) {
    return [isScopeEmpty, `type 为 revert 时对应的 scope 必须为空，subject 值为被回滚 commit 的完整 message header`]
  }
  return [
    value.find(item => scope === item),
    `scope 必须为 [${value}] 其中之一，当前为 ${scope}，当且仅当 type 为 revert 时 scope 为空`,
  ]
}
