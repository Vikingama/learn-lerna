export default {
  data() {
    return {
      apiHandlerInstance: undefined,
    }
  },
  methods: {
    openPage(pageComponentInfo = {}, containerInfo = {}) {
      return this.apiHandlerInstance.openPage(pageComponentInfo, containerInfo)
    },
    popTopPage() {
      return this.apiHandlerInstance.popTopPage()
    },
    popPage(index, doNextWhenPopSuccess) {
      return this.apiHandlerInstance.popPage(index, doNextWhenPopSuccess)
    },
  },
}
