/**
 * 将指定字符串的驼峰式转换成指定标记
 * @param str 待转换字符串
 * @param flag 转换目标标记，默认为中划线
 * @returns {*} 完成转换后的字符串
 */
export default function hump2flag(str, flag = '-') {
  const reg = /([A-Z])/g
  return str.replace(reg, `${flag}$1`).toLowerCase()
}
