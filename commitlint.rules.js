function customSubjectActionEnum({ subject }, when = 'never', value = []) {
  const always = when === 'always'
  if (!always) {
    return [true]
  }
  if (typeof subject !== 'string' || (typeof subject === 'string' && subject.length === 0)) {
    return [false, `提交的简要描述不能为空`]
  }
  const action = subject.slice(0, 2)
  if (!value.find(item => action === item)) {
    return [false, `提交的简要描述应该以中文动词加一个空格起头，动词可选值为[${value}]，当前值为 '${action}'`]
  }
  if (!subject.startsWith(`${action} `) || subject.slice(3, 4) === ' ') {
    return [false, `提交的简要描述中动词后需且仅需添加一个空格`]
  }
  return [true]
}
function customScopeEnum({ scope }, when = 'never', value = []) {
  const always = when === 'always'
  if (!always) {
    return [true]
  }
  return [value.find(item => scope === item), `scope 必须为 [${value}] 其中之一，当前为 ${scope}`]
}

module.exports = {
  'custom-subject-action-enum': customSubjectActionEnum,
  'custom-scope-enum': customScopeEnum,
}
