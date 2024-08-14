/**
 * 列表分页
 * @param list 列表数组
 * @param page 页码
 * @param pageSize 每页大小
 * @returns Array 刷选出的分页集合
 */
export default function (list, page, pageSize) {
  let result = list
  if (!list || list.length <= 0) {
    return []
  }
  if (page && pageSize) {
    const begin = (page - 1) * pageSize
    const end = page * pageSize
    result = result.slice(begin, end <= result.length ? end : result.length)
  }
  return result
}
