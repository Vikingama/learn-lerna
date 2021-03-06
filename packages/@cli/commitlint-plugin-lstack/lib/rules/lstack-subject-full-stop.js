/**
 * @fileoverview 这条规则定义为：提交标题的概要 subject 不能指定字符结尾。
 * @author wubin
 */

module.exports = ({ subject }, when = 'never', value = []) => {
  const always = when === 'always'
  if (!always || value.length <= 0) {
    return [true]
  }
  const matchChars = value.join('')
  const reg = new RegExp(`[${matchChars}]$`, 'g')
  if (!(typeof subject === 'string')) {
    return [true]
  }
  return [!reg.test(subject.trim()), `提交标题的概要 subject 不能以以下字符 ${matchChars} 结尾。`]
}
