const { execSync } = require('child_process')

const getWorkspacesInfo = () => {
  let temp
  try {
    const yarnStdout = execSync('yarn workspaces info', {
      encoding: 'utf8',
    })
      .replace(/^yarn workspaces.*$/m, '')
      .replace(/^Done.*$/m, '')
      .replace(/\n/g, '')
    temp = JSON.parse(yarnStdout)
  } catch (error) {
    throw new Error(`执行 yarn workspaces info 命令时出错，具体如下：\n${error}`)
  }
  if (Object.prototype.toString.call(temp) !== '[object Object]') {
    return {}
  }
  return temp
}
const getWorkspaces = () => {
  let temp
  try {
    temp = getWorkspacesInfo()
  } catch (error) {
    throw new Error(`获取不到 workspaces 信息。\n${error}`)
  }
  if (Object.prototype.toString.call(temp) !== '[object Object]') {
    return []
  }
  return Object.keys(temp).map(name => ({ name, ...temp[name] }))
}
const getWorkspacesName = () => {
  let temp
  try {
    temp = getWorkspacesInfo()
  } catch (error) {
    throw new Error(`获取不到 workspaces name 信息。\n${error}`)
  }
  if (Object.prototype.toString.call(temp) !== '[object Object]') {
    return []
  }
  return Object.keys(temp)
}

exports.getWorkspaces = getWorkspaces
exports.getWorkspacesInfo = getWorkspacesInfo
exports.getWorkspacesName = getWorkspacesName
