/**
 * @fileoverview 这条规则定义为：
 * 1、如果提交 type 不为 revert，则 scope 不能为空。如：`build(root): 添加 commitlint 工具进行提交校验`。
 * 2、如果提交 type 为 revert，则 scope 必须为空。如：`revert: build(root): 添加 commitlint 工具进行提交校验`。
 * @author wubin
 */

const isRevertType = require('../utils/is-revert-type')

module.exports = ({ type, scope = null }, when = 'never') => {
  const always = when === 'always'
  if (!always) {
    return [true]
  }
  const isScopeEmpty = scope === null
  if (isRevertType(type)) {
    return [isScopeEmpty, `type 为 revert 时对应的 scope 必须为空，subject 值为被回滚 commit 的完整 message header`]
  }
  return [!isScopeEmpty, `scope 不能为空，除非 type 为 revert`]
}
