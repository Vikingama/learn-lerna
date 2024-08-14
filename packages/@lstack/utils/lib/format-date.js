/**
 * 按照指定格式格式化日期
 * @param date 日期
 * @param fmt 格式化格式，默认格式为 yyyy-MM-dd hh:mm:ss
 * @returns {string} 格式化后的字符串
 */
export default function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  let result = fmt
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(result)) result = result.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
  for (const k in o)
    if (new RegExp(`(${k})`).test(result))
      result = result.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length))
  return result
}
