<script>
  import LuiCodemirror from '../../../lui/lui-codemirror'
  import BaseMirrorConfig from '../config/base-mirror-config'
  import ShellMirrorConfig from '../config/shell-mirror-config'

  export default {
    name: 'ShellMirror',
    extends: LuiCodemirror,
    mixins: [BaseMirrorConfig, ShellMirrorConfig],
    props: {
      title: { type: String, default: 'Shell 编辑框' },
    },
  }
</script>
