import { logError } from '@lstack/utils'

export default {
  name: 'ProvidePageStack',
  provide() {
    return {
      getPageStack: this.getPageStack,
      openPage: this.openPage,
      popTopPage: this.popTopPage,
      popPage: this.popPage,
      isStackEmpty: this.isStackEmpty,
      pIsPageStack: false,
    }
  },
  methods: {
    getPageStack() {
      if (this.$refs === undefined) {
        logError(`${this.$vnode.tag}.getPageStack，页面还未渲染完成，无法获取到 $refs 引用`)
        return undefined
      }
      if (this.$refs.pageStack === undefined) {
        logError(
          `${this.$vnode.tag}.getPageStack $refs.pageStack 不存在，请确保将 pageStack 的 ref 指向具体 VNode 实例`
        )
        return undefined
      }
      return this.$refs.pageStack
    },
    openPage(pageComponentInfo = {}, containerInfo = {}) {
      return this.getPageStack().openPage(pageComponentInfo, containerInfo)
    },
    popTopPage() {
      return this.getPageStack().popTopPage()
    },
    isStackEmpty() {
      return this.getPageStack().isStackEmpty()
    },
    popPage(index, doNextWhenPopSuccess) {
      return this.getPageStack().popPage(index, doNextWhenPopSuccess)
    },
  },
}
