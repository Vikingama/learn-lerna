import ShellMirror from './shell-mirror'

ShellMirror.install = Vue => {
  Vue.component(ShellMirror.name, ShellMirror)
}

export default ShellMirror
