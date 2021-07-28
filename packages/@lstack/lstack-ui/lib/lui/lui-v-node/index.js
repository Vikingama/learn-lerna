import LuiVNode from './lui-v-node'

LuiVNode.install = Vue => {
  Vue.component(LuiVNode.name, LuiVNode)
}

export default LuiVNode
