<script>
  import LuiCodemirror from '../../../lui/lui-codemirror'
  import BaseMirrorConfig from '../config/base-mirror-config'
  import DockerfileMirror from '../config/dockerfile-mirror-config'

  export default {
    name: 'DockerfileMirror',
    extends: LuiCodemirror,
    mixins: [BaseMirrorConfig, DockerfileMirror],
    props: {
      title: { type: String, default: 'Dockerfile 编辑框' },
    },
  }
</script>
