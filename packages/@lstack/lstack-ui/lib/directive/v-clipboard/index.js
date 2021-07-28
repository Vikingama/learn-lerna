import VClipboard from './v-clipboard'

VClipboard.install = Vue => {
  Vue.prototype.$clipboard = VClipboard.$clipboard
  Vue.directive(VClipboard.name, VClipboard)
}

export default VClipboard
