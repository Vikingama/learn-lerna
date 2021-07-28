import jsyaml from 'js-yaml'
// 编辑器模式
import 'codemirror/mode/javascript/javascript'

if (!window.jsyaml) {
  window.jsyaml = jsyaml
}

export default {
  computed: {
    iOptions() {
      return {
        mode: 'text/x-yaml',
      }
    },
  },
}
