const { execSync } = require('child_process')
const { getWorkspacesName } = require('./workspace')

const getCurrentBranch = () => {
  try {
    const gitStatus = execSync('git status', { encoding: 'utf8' })
    return gitStatus.split('\n')[0].replace('On branch ', '')
  } catch (error) {
    throw new Error(`执行 git 命令时出错，具体如下：\n${error.toString()}`)
  }
}
const getCommitScopes = () => {
  const temp = getWorkspacesName()
  if (Array.isArray(temp)) {
    return temp.map(name => (name.charAt(0) === '@' ? name.split('/')[1] : name))
  }
  return []
}

exports.getCurrentBranch = getCurrentBranch
exports.getCommitScopes = getCommitScopes
