/**
 * 将制定 base64 字符解密
 * @param {string} str 待解密字符串
 */
export default function decodeBase64(str) {
  return decodeURIComponent(escape(window.atob(str)))
}
