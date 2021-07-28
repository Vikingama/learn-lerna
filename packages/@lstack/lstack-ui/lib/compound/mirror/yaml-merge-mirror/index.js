import YamlMergeMirror from './yaml-merge-mirror'

YamlMergeMirror.install = Vue => {
  Vue.component(YamlMergeMirror.name, YamlMergeMirror)
}

export default YamlMergeMirror
