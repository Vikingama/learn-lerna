/**
 * @fileoverview 这条规则定义为：
 * 1、提交标题简要描述 subject 应该以指定动词中的 action 起头。
 * 2、提交标题简要描述 subject 动词 action 后需且仅需添加一个空格。
 * @author wubin
 */
module.exports = ({ subject }, when = 'never', value = []) => {
  const always = when === 'always'
  if (!always || value.length <= 0) {
    return [true]
  }
  if (!(typeof subject === 'string')) {
    return [false, `提交标题简要描述 subject 中动词 action 后需且仅需添加一个空格`]
  }
  const action = subject.slice(0, 2)
  if (!value.find(item => action === item)) {
    return [
      false,
      `提交标题简要描述 subject 应该以中文动词现在时加一个空格起头，动词 action 可选值为[${value}]，当前值为 '${action}'`,
    ]
  }
  if (!subject.startsWith(`${action} `)) {
    return [false, `提交标题简要描述 subject 中动词 action 后需且仅需添加一个空格`]
  }
  if (subject.slice(3, 4) === ' ') {
    return [false, `提交标题简要描述 subject 中动词 action 后需且仅需添加一个空格`]
  }
  return [true]
}
