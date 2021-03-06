/**
 * @fileoverview 这条规则定义为：
 * action 与 type 的对应校验：
 * 1、当 type 为 'feat' 时，action 必须为'添加'。
 * 2、当 type 为 'version' 时，action 必须为'发布'，反之亦然。
 * 3、当 type 为 'pref' 时，action 必须为'优化'。
 * 4、当 type 为 'style' 时，action 必须为'调整'。
 * 5、当 type 为 [fix,st,sit] 之一时，action 必须为'修复'，反之亦然。
 * @author wubin
 */

module.exports = ({ type, subject }, when = 'never') => {
  const always = when === 'always'
  if (!always) {
    return [true]
  }
  const action = typeof subject === 'string' ? subject.slice(0, 2) : ''

  const fixAction = '修复'
  const fixTypes = ['fix', 'st', 'sit']
  const isFixAction = action === fixAction
  const isFixType = fixTypes.find(item => type === item)
  if (isFixAction && !isFixType) {
    return [false, `action 为 '${action}' 时，对应的 type 需为 [${fixTypes}] 之一，当前为 ${type}`]
  }
  if (isFixType && !isFixAction) {
    return [false, `type 为 '${type}' 时，对应的 action 需为 '${fixAction}'，当前为 ${action}`]
  }

  const versionAction = '发布'
  const versionType = 'version'
  const isVersionAction = action === versionAction
  const isVersionType = type === versionType
  if (isVersionAction && !isVersionType) {
    return [false, `action 为 '${action}' 时，对应的 type 需为 '${versionType}'，当前 type 为 '${type}'`]
  }
  if (isVersionType && !isVersionAction) {
    return [false, `type 为 '${type}' 时，对应的 action 需为 '${versionAction}'，当前为 '${action}'`]
  }

  const prefAction = '优化'
  const prefType = 'pref'
  const isPrefAction = action === prefAction
  const isPrefType = type === prefType
  if (isPrefType && !isPrefAction) {
    return [false, `type 为 '${type}' 时，对应的 action 需为 '${prefAction}'，当前为 '${action}'`]
  }

  const featAction = '添加'
  const featType = 'feat'
  const isFeatAction = action === featAction
  const isFeatType = type === featType
  if (isFeatType && !isFeatAction) {
    return [false, `type 为 '${type}' 时，对应的 action 需为 '${featAction}'，当前为 '${action}'`]
  }

  const styleAction = '调整'
  const styleType = 'style'
  const isStyleAction = action === styleAction
  const isStyleType = type === styleType
  if (isStyleType && !isStyleAction) {
    return [false, `type 为 '${type}' 时，对应的 action 需为 '${styleAction}'，当前为 '${action}'`]
  }
  return [true]
}
