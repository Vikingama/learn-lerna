import { isFunction, logError } from '@lstack/utils'

export default {
  name: 'Closeable',
  props: {
    // 返回值为是否拦截该 forward 事务，true 为拦截，不往下继续执行
    closeApi: Function,
    beforeClose: Function,
    beforeCloseAsync: Function,
  },
  methods: {
    handleCloseClick() {
      if (isFunction(this.closeApi)) {
        this.closeApi()
      } else {
        logError('请指定 closeApi')
      }
    },
  },
}
