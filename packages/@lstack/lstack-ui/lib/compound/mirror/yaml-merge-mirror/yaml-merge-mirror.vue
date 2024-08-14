<script>
  import MergeMirrorConfig from '../config/merge-mirror-config'
  import YamlMirror from '../yaml-mirror'

  export default {
    name: 'YamlMergeMirror',
    extends: YamlMirror,
    mixins: [MergeMirrorConfig],
    props: {
      title: { type: String, default: 'YAML 编辑框' },
    },
  }
</script>
