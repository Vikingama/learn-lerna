// 编辑器模式
import 'codemirror/mode/yaml/yaml'
// lint相关
import 'codemirror/addon/lint/yaml-lint'

export default {
  computed: {
    iOptions() {
      return {
        mode: 'application/lb+json',
      }
    },
  },
}
