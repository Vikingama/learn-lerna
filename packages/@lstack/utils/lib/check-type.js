/**
 * 校验指定 val 是否为指定的类型
 * @param val{any} 被检查的任何类型数据
 * @param type 指定的类型，首字母大写
 * @returns {boolean} 校验结果
 */
export default function checkType(val, type) {
  return Object.prototype.toString.call(val) === `[object ${type}]`
}
