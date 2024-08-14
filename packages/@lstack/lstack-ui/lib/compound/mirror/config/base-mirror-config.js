// 主题
import 'codemirror/lib/codemirror.css' // 基础样式
import 'codemirror/addon/lint/lint.css' // lint提示样式
import 'codemirror/theme/eclipse.css' // 亮系样式
import 'codemirror/theme/material.css' // 暗系样式
// import 'codemirror/theme/monokai.css'
// 编辑器模式

// lint相关
import 'codemirror/addon/lint/lint'

// 高亮光标所在行
// import 'codemirror/addon/selection/active-line'

// 搜索相关 https://codemirror.net/demo/search.html
import 'codemirror/addon/search/search'
import 'codemirror/addon/search/searchcursor'
import 'codemirror/addon/search/jump-to-line'
import 'codemirror/addon/dialog/dialog'
import 'codemirror/addon/dialog/dialog.css'

// 折叠相关
import 'codemirror/addon/fold/foldgutter.css' // 折叠样式
// import 'codemirror/addon/fold/brace-fold.js'
// import 'codemirror/addon/fold/comment-fold.js'
// import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/indent-fold' // 依据缩进折叠

// 快捷键相关
import 'codemirror/addon/edit/matchbrackets'
// import 'codemirror/addon/comment/comment.js'
// import 'codemirror/keymap/sublime.js'

// 自动刷新，避免隐藏显示出现需要点击才能显示的bug！！！
import 'codemirror/addon/display/autorefresh'

export default {
  computed: {
    aOptions_common() {
      return undefined
    },
    aOptions() {
      return {
        // codemirror options
        // readOnly: false, // 编辑器是否只读。如果设置为预设的值 “nocursor”，那么除了设置只读外，编辑区域还不能获得焦点。
        // theme: 'eclipse', // 配置编辑器的主题样式。要使用主题，必须保证名称为 .cm-s-[name] (name是设置的theme的值)的样式是加载上了的。当然，你也可以一次加载多个主题样式，使用方法和html和使用类一样，
        // lineWrapping: false, // 在长行时文字是否自动换行(wrap)，默认为false:滚动(scroll)。

        line: true,
        styleActiveLine: false, // 是否高亮当前行,添加"active-line"样式类
        autofocus: false, // 自动聚焦
        matchBrackets: true, //  匹配结束符号，比如"]、}"
        //  autoCloseBrackets: true, //  自动闭合符号
        lineSeparator: null, // 明确指定编辑器使用的行分割符（换行符）。默认（值为null)
        indentUnit: 2, //  缩进单位，值为空格数，默认为2 。
        //  tabSize: 4,// tab字符的宽度，默认为4 。
        smartIndent: true, // 自动缩进，设置是否根据上下文自动缩进（和上一行相同的缩进量）。默认为true。
        indentWithTabs: false, // 在缩进时，是否需要把 n*tab宽度个空格替换成n个tab字符，默认为false 。
        electricChars: true, // 在输入可能改变当前的缩进时，是否重新缩进，默认为true （仅在mode支持缩进时有效）。
        //  specialChars:'/[\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/',// 需要被占位符(placeholder)替换的特殊字符的正则表达式。最常用的是非打印字符。默认为：/[\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/。
        // specialCharPlaceholder: function(char) → Element // 这是一个接收由specialChars选项指定的字符作为参数的函数，此函数会产生一个用来显示指定字符的DOM节点。默认情况下，显示一个红点（•），这个红点有一个带有前面特殊字符编码的提示框。
        //  keyMap: 'default',// 配置快捷键。默认值为default，即 codemorrir.js 内部定义。其它在key map目录下。
        //  extraKeys:{},// 给编辑器绑定与前面keyMap配置不同的快捷键。
        lineNumbers: true, // 是否在编辑器左侧显示行号。
        //  firstLineNumber: 1,// 行号从哪个数开始计数，默认为1 。
        //  lineNumberFormatter: function(line: integer) → string// 使用一个函数设置行号。
        foldGutter: true, //  启用行槽中的代码折叠
        lint: true, // 启用lint校验
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'], // 用来添加额外的gutter（在行号gutter前或代替行号gutter）。值应该是CSS名称数组，每一项定义了用于绘制gutter背景的宽度（还有可选的背景）。为了能明确设置行号gutter的位置（默认在所有其它gutter的右边），也可以包含CodeMirror-linenumbers类。类名是用于传给setGutterMarker的键名(keys)。
        //  fixedGutter: true,// 设置gutter跟随编辑器内容水平滚动（false）还是固定在左侧（true或默认）。
        scrollbarStyle: 'native', // 设置滚动条。默认为”native”，显示原生的滚动条。核心库还提供了”null”样式，此样式会完全隐藏滚动条。Addons可以设置更多的滚动条模式。
        //  coverGutterNextToScrollbar: true,// 当fixedGutter启用，并且存在水平滚动条时，在滚动条最左侧默认会显示gutter，当此项设置为true时，gutter会被带有CodeMirror-gutter-filler类的元素遮挡。
        showCursorWhenSelecting: true, // 在选择时是否显示光标，默认为false。
        //  tabindex:1,// 编辑器的tabindex。
        //  dragDrop:true,// 是否允许拖放，默认为true。
        //  allowDropFileTypes: null,// 默认为null。当设置此项时，只接收包含在此数组内的文件类型拖入编辑器。文件类型为MIME名称。
        cursorHeight: 1, // 光标高度。默认为1，也就是撑满行高。对一些字体，设置0.85看起来会更好。
        addModeClass: false, // 当启用时（默认禁用），会给每个标记添加额外的表示生成标记的mode的以cm-m开头的CSS样式类。例如，XML mode产生的标记，会添加cm-m-xml类。
        ...this.aOptions_common,
      }
    },
  },
}
