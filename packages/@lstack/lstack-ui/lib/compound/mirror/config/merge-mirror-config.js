import DiffMatchPatch from 'diff-match-patch'

// 文本比较相关
import 'codemirror/addon/merge/merge'
import 'codemirror/addon/merge/merge.css'
import { isEmpty } from '@lstack/utils'

window.diff_match_patch = DiffMatchPatch
window.DIFF_DELETE = -1
window.DIFF_INSERT = 1
window.DIFF_EQUAL = 0

export default {
  props: {
    merge: { type: Boolean, default: true },
    origRightCode: String,
    origRightData: Object,
  },
  data() {
    return {
      origRightContent: '',
    }
  },
  computed: {
    aOptions_common() {
      const origRight = this.origRightContent
      return {
        origLeft: undefined,
        origRight,
        lint: false,
        // string类型, 如果提供了这些，则提供了文档的原始版本，这些原始版本将在不可编辑的CodeMirror实例中显示在编辑器的左侧和右侧。合并界面将突出显示可编辑文档和原始文档之间的更改。要创建2向（与3向相反）合并视图，请仅提供其中之一。
        revertButtons: false,
        // 确定是否显示允许用户还原更改的按钮。
        revertChunk: () => {},
        // fn(mv: MergeView, from: CodeMirror, fromStart: Pos, fromEnd: Pos, to: CodeMirror, toStart: Pos, toEnd: Pos)
        // 可用于定义用户还原更改后的块时的自定义行为。
        connect: 'CodeMirror-merge-r-connect', // 'CodeMirror-merge-r-connect'
        // 设置用于连接更改的代码块的样式。默认情况下，绘制连接器。设置"align"为时，将填充较小的块以与较大的块对齐。
        collapseIdentical: false,
        // 如果为true（默认值为false），则未折叠的文本片段将被折叠。给定数字时，这表示在这些延伸段（默认为2）附近可见的行数。
        allowEditingOriginals: false,
        // 确定原始编辑器是否允许编辑。默认为false。
        showDifferences: true,
        // 如果为true（默认值），则突出显示更改的文本。
        chunkClassLocation: undefined,
        // 默认情况下，块突出显示使用addLineClass 'background' 添加。重写此参数可将其自定义为任何有效的“ where”参数或有效的“ where”参数数组。
        // 该插件还定义命令"goNextDiff" 并"goPrevDiff"快速跳转到下一个更改的块。演示在这里。
        highlightDifferences: true,
      }
    },
  },
  watch: {
    origRightData(newVal) {
      if (!isEmpty(newVal)) {
        this.origRightContent = this.translateData2code(newVal)
      }
    },
    origRightCode(newVal) {
      this.origRightContent = newVal !== undefined ? newVal : ''
    },
  },
}
