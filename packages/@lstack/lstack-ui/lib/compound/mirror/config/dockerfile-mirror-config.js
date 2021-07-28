// 编辑器模式
import 'codemirror/mode/dockerfile/dockerfile'

export default {
  computed: {
    iOptions() {
      return {
        mode: 'text/x-dockerfile',
      }
    },
  },
}
