import VHighlight from './v-highlight'

VHighlight.install = Vue => {
  Vue.directive('highlight', VHighlight)
}

export default VHighlight
