const { getWorkspacesName } = require('@cli/yarn/lib/workspaces')

/**
 * 根据工程中的 Workspaces 包名生成 commit scopes，如果包在某个组下，则去除组名 @* 作为 scope
 */
function getCommitScopes() {
  const workspacesName = getWorkspacesName()
  if (!(workspacesName instanceof Array)) {
    return []
  }
  return workspacesName.map(name => (name.charAt(0) === '@' ? name.split('/')[1] : name))
}

module.exports.getCommitScopes = getCommitScopes
