<script>
  import LuiCodemirror from '../../../lui/lui-codemirror'
  import BaseMirrorConfig from '../config/base-mirror-config'
  import JsonMirrorConfig from '../config/json-mirror-config'

  export default {
    name: 'JsonMirror',
    extends: LuiCodemirror,
    mixins: [BaseMirrorConfig, JsonMirrorConfig],
    props: {
      title: { type: String, default: 'JSON 编辑框' },
    },
  }
</script>
