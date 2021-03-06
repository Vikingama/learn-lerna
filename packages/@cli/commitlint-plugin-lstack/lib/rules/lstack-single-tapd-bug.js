/**
 * @fileoverview 这条规则定义为：
 * 如果 tapd 单子 ID 或 issue 编号只能是数值。
 * 如果本次提交涉及关闭 tapd 单子：`Closes #1000000`，则单次提交仅能关闭一个单子，多个单子需要分多次进行提交。`，则单次提交仅能关闭一个单子，多个单子需要分多次进行提交。
 * @author wubin
 */

module.exports = ({ references = [] }, when = 'never') => {
  const always = when === 'always'
  if (!always) {
    return [true]
  }
  const tapdIdTags = []
  for (let i = 0; i < references.length; i += 1) {
    const { issue } = references[i]
    const reg = /^[1-9][0-9]*$/
    if (!reg.test(issue)) {
      return [false, `issue 或 tapd 单号 '${issue}' 不正确，其值应该是合理的数值类型。`]
    }
    const id = parseInt(issue, 10)
    if (id >= 1000000) {
      tapdIdTags.push(`【ID${id}】`)
    }
  }
  if (tapdIdTags.length > 1) {
    return [
      false,
      `单次提交要求仅 Closes 一个 tapd 单子，本次提交涉及${tapdIdTags.join('、')}${
        tapdIdTags.length
      } 个 tapd 单子，需要分 ${tapdIdTags.length} 次进行提交。`,
    ]
  }
  return [true]
}
