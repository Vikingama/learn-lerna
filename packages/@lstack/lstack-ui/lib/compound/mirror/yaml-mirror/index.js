import YamlMirror from './yaml-mirror'

YamlMirror.install = Vue => {
  Vue.component(YamlMirror.name, YamlMirror)
}

export default YamlMirror
