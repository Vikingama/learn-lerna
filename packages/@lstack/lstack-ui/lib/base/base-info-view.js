import BaseView from './base-view'

export default {
  name: 'BaseInfoView',
  extends: BaseView,
  props: {
    info: Object,
  },
  data() {
    return {
      mInfo: undefined,
    }
  },
  computed: {
    cInfo() {
      if (this.mInfo) {
        return this.mInfo
      }
      if (this.info) {
        return this.info
      }
      return this.$route.query
    },
  },
}
