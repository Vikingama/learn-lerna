import { isFunction, isObject } from '@lstack/utils'
import BaseView from './base-view'

export default {
  name: 'BaseFormView',
  extends: BaseView,
  data() {
    return {
      formInstance: undefined,
      route: undefined,
    }
  },
  computed: {
    cRoute() {
      if (isObject(this.route)) {
        return this.route
      }
      if (this.$project && this.$project.routeMap) {
        const currentRoute = this.$project.routeMap[this.$route.name]
        if (currentRoute) {
          return currentRoute
        }
      }
      return {}
    },
  },
  methods: {
    selectFirst(optionValues) {
      return optionValues[0]
    },
    toastSuccessAndClose(msg = '创建成功') {
      this.$message.success(msg)
      this.$emit('created')
      if (isObject(this.$refs.formPage) && isFunction(this.$refs.formPage.close)) {
        this.$refs.formPage.close()
      }
    },
    toastUpdateSuccessAndClose(msg = '修改成功') {
      this.$message.success(msg)
      this.$emit('updated')
      if (isObject(this.$refs.formPage) && isFunction(this.$refs.formPage.close)) {
        this.$refs.formPage.close()
      }
    },
  },
  mounted() {
    if (this.$refs.formPage) {
      this.formInstance = this.$refs.formPage.formInstance
    }
  },
}
