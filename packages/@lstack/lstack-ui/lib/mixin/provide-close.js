import { logError } from '@lstack/utils'

export default {
  name: 'ProvideClose',
  provide() {
    return {
      pClose: this.close,
    }
  },
  methods: {
    close() {
      logError('请重载该方法以 provide close')
    },
  },
}
