// 编辑器模式
import 'codemirror/mode/shell/shell'

export default {
  computed: {
    iOptions() {
      return {
        mode: 'text/x-sh',
      }
    },
  },
}
