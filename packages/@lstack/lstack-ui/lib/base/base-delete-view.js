import BaseView from './base-view'

export default {
  name: 'BaseDeleteView',
  extends: BaseView,
  props: {
    list: Array,
  },
  data() {
    return {
      confirmed: false,
    }
  },
  methods: {
    toastSuccessAndClose(close) {
      this.$message.success('删除成功')
      this.$emit('deleted')
      close()
    },
    changeConfirmed(confirmed) {
      this.confirmed = confirmed
    },
  },
}
