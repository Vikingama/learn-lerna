/**
 * 将指定字符串的指定标记转换成驼峰式
 * @param str 待转换字符串
 * @param flag 匹配的标记，默认为中划线
 * @returns {*} 完成转换后的字符串
 */
export default function flag2Hump(str, flag = '-') {
  const reg = new RegExp(`${flag}(\\w)`, 'g')

  return str.replace(reg, (all, letter) => {
    return letter.toUpperCase()
  })
}
