const { execSync } = require('child_process')

/**
 * 获取 yarn workspaces 信息，返回 yarn workspaces info 执行结果，返回值是个 Object，无数据时返回空对象。
 */
function getWorkspacesInfo() {
  let workspacesInfo
  try {
    const yarnLog = execSync('yarn workspaces info', { encoding: 'utf8' })
    let workspacesInfoStr = yarnLog
    if (yarnLog.indexOf('yarn workspaces') >= 0) {
      workspacesInfoStr = workspacesInfoStr.replace(/^yarn workspaces.*$/m, '')
    }
    if (yarnLog.indexOf('Done') >= 0) {
      workspacesInfoStr = workspacesInfoStr.replace(/^Done.*$/m, '')
    }
    workspacesInfo = JSON.parse(workspacesInfoStr)
  } catch (err) {
    throw new Error(`执行 yarn workspaces info 命令时出错，具体如下：\n${err}`)
  }
  if (Object.prototype.toString.call(workspacesInfo) !== '[object Object]') {
    return {}
  }
  return workspacesInfo
}

/**
 * 获取 yarn workspaces 信息，返回值是个数组，无数据时返回空数组。
 */
function getWorkspaces() {
  let workspacesInfo
  try {
    workspacesInfo = getWorkspacesInfo()
  } catch (err) {
    throw new Error(`获取不到 Workspaces 信息。\n${err}`)
  }
  if (Object.prototype.toString.call(workspacesInfo) !== '[object Object]') {
    return []
  }
  return Object.keys(workspacesInfo).map(workspaceName => {
    return { name: workspaceName, ...workspacesInfo[workspaceName] }
  })
}

/**
 * 获取 yarn workspaces 名称列表，返回值是个数组，无数据时返回空数组。
 */
function getWorkspacesName() {
  let workspacesInfo
  try {
    workspacesInfo = getWorkspacesInfo()
  } catch (err) {
    throw new Error(`获取不到 Workspaces 信息。\n${err}`)
  }
  if (Object.prototype.toString.call(workspacesInfo) !== '[object Object]') {
    return []
  }
  return Object.keys(workspacesInfo)
}

module.exports.getWorkspacesInfo = getWorkspacesInfo
module.exports.getWorkspaces = getWorkspaces
module.exports.getWorkspacesName = getWorkspacesName
