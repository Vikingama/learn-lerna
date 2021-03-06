/**
 * @fileoverview 这条规则定义为：
 * 指定测试分支下（默认为'release'），只能进行['fix','st','sit']类型的提交。
 * ['st','sit']类型提交仅能在指定测试分支下（默认为'release'）进行提交，'fix'类型无限制
 * @author wubin
 */

const { getCurrentBranch } = require('@cli/git/lib/branch')

module.exports = ({ type }, when = 'never', value = 'release') => {
  const always = when === 'always'
  if (!always) {
    return [true]
  }
  const currentBranch = getCurrentBranch()
  const isReleaseBranch = currentBranch === value
  if (isReleaseBranch) {
    const bugTypes = ['fix', 'st', 'sit']
    const isBugType = bugTypes.find(item => type === item)
    return [isBugType, `'${value}' 分支只能进行提交[${bugTypes}]中的类型 type 提交，当前 type 为${type}`]
  }
  const onlyBranchTypes = ['st', 'sit']
  const isOnlyBranchType = onlyBranchTypes.find(item => type === item)
  if (isOnlyBranchType) {
    return [isReleaseBranch, `提交类别 type 为 '${type}' 时，只能在 ${value} 分支进行提交，当前分支为 ${currentBranch}`]
  }
  return [true]
}
