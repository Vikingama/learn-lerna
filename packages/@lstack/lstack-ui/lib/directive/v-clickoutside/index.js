import VClickoutside from './v-clickoutside'

VClickoutside.install = Vue => {
  Vue.directive('clickoutside', VClickoutside)
}

export default VClickoutside
