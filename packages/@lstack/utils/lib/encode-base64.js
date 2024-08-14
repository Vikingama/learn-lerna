/**
 * 将指定字符串加密为 base64 串
 * @param {string} str 待加密字符串
 */
export default function encodeBase64(str) {
  return window.btoa(unescape(encodeURIComponent(str)))
}
