/**
 * 判断指定路径是否为外链
 * @param {string} path 路径
 * @returns {Boolean} 是否外链
 */
const isExternalLink = path => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export default isExternalLink
